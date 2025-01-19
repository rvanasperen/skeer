<?php

namespace App\Support;

use App\Enums\GroupBy;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use LogicException;

class QueryHelper
{
    public function addGroupBy(
        HasMany $query,
        GroupBy $groupBy,
        string  $column = 'transaction_date',
        string  $alias = 'date',
    ): void
    {
        $dbDriver = DB::getConfig('driver');

        switch ($dbDriver) {
            case 'sqlite':
                $this->addGroupBySqlite($query, $groupBy, $column, $alias);
                break;

            default:
                throw new LogicException("Group by not supported for driver: $dbDriver");
        }
    }

    private function addGroupBySqlite(HasMany $query, GroupBy $groupBy, string $column, string $alias): void
    {
        switch ($groupBy) {
            case GroupBy::Day:
                $query->selectRaw("DATE($column) AS $alias");
                break;
            case GroupBy::Week:
                $query->selectRaw("strftime('%Y-%W', $column) AS $alias");
                break;
            case GroupBy::Month:
                $query->selectRaw("strftime('%Y-%m', $column) AS $alias");
                break;
            case GroupBy::Year:
                $query->selectRaw("strftime('%Y', $column) AS $alias");
                break;
        }
    }
}
