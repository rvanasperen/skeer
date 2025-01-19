<?php

if (! function_exists('array_find_key')) {
    // Backported from PHP 8.4
    function array_find_key(array $array, callable $callback): mixed
    {
        foreach ($array as $key => $value) {
            if ($callback($value, $key)) {
                return $key;
            }
        }

        return null;
    }
}
