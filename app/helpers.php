<?php

use JetBrains\PhpStorm\ExpectedValues;

if (! function_exists('notify')) {
    /**
     * Show a notification to the user.
     */
    function notify(
        string $message,
        #[ExpectedValues(['success', 'error'])]
        string $type = 'success',
    ): void
    {
        session()?->flash('notification', [
            'message' => $message,
            'type' => $type,
        ]);
    }
}
