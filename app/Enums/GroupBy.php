<?php

namespace App\Enums;

enum GroupBy: string
{
    case Day = 'day';
    case Week = 'week';
    case Month = 'month';
    case Year = 'year';
}
