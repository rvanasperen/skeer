<?php

namespace App\Enums;

enum TransactionType: string
{
    case Expense = 'Expense';
    case Income = 'Income';
}
