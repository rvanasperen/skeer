<?php

namespace App\Domain\Transaction;

use App\Domain\Transaction\Transformers\INGBNL2ATransformer;
use App\Enums\AccountType;
use App\Models\Bank;
use App\Models\Currency;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use LogicException;
use RuntimeException;
use Throwable;

readonly class TransactionImporter
{
    private array $transformersMap;

    public function __construct()
    {
        $this->transformersMap = [
            'INGBNL2A' => INGBNL2ATransformer::class,
        ];
    }

    public function import(User $user, Bank $bank, Currency $currency, string $csvFilePath): void
    {
        DB::beginTransaction();

        try {
            $accountsByNumber = [];

            if (! isset($this->transformersMap[$bank->bic])) {
                throw new LogicException("No transformer found for bank: $bank->name ($bank->bic)");
            }

            /** @var Transformer $transformer */
            $transformer = resolve($this->transformersMap[$bank->bic]);

            $fp = fopen($csvFilePath, 'rb');

            $headers = fgetcsv($fp);

            while ($row = fgetcsv($fp)) {
                $data = array_combine($headers, $row);

                $hash = sha1(serialize($data));

                if ($user->transactions()->where('import_hash', $hash)->exists()) {
                    throw new RuntimeException("Transaction with hash $hash already imported");
                }

                $accountNumber = $transformer->getAccountNumber($data);

                if (! isset($accountsByNumber[$accountNumber])) {
                    $account = $user->accounts()
                        ->where('number', $accountNumber)
                        ->first();

                    if ($account === null) {
                        $account = $user->accounts()->create([
                            'bank_id' => $bank->id,
                            'currency_id' => $currency->id,
                            'name' => "{$accountNumber} (imported)",
                            'number' => $accountNumber,
                            'type' => AccountType::Checking,
                        ]);
                    }

                    $accountsByNumber[$accountNumber] = $account;
                }

                $transactionData = $transformer->getTransactionData($data);

                $user->transactions()->create([
                    'user_id' => $user->id,
                    'account_id' => $accountsByNumber[$accountNumber]->id,
                    'type' => $transactionData->type,
                    'amount' => $transactionData->amount,
                    'name' => $transactionData->name,
                    'counterparty' => $transactionData->counterparty,
                    'description' => $transactionData->description,
                    'transaction_date' => $transactionData->transactionDate,
                    'imported_at' => now(),
                    'import_hash' => $hash,
                ]);
            }
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        DB::commit();
    }
}
