import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

export type KeyboardShortcut = {
    keySequence: string[];
    action: () => void;
};

type KeyboardShortcutsContextType = {
    registerKeyboardShortcut: (shortcut: KeyboardShortcut) => void;
    unregisterKeyboardShortcut: (keys: string[]) => void;
};

const KeyboardShortcutsContext = createContext<
    KeyboardShortcutsContextType | undefined
>(undefined);

export function useKeyboardShortcutsContext() {
    const context = useContext(KeyboardShortcutsContext);

    if (!context) {
        throw new Error(
            'useShortcutsContext must be used within a ShortcutsProvider',
        );
    }

    return context;
}

export function KeyboardShortcutsProvider({ children }: PropsWithChildren) {
    const [keyboardShortcuts, setKeyboardShortcuts] = useState<
        KeyboardShortcut[]
    >([]);
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const TIMEOUT_MS = 1000;

    const registerKeyboardShortcut = useCallback(
        (shortcut: KeyboardShortcut) => {
            setKeyboardShortcuts((prevShortcuts) => [
                ...prevShortcuts,
                shortcut,
            ]);
        },
        [],
    );

    const unregisterKeyboardShortcut = useCallback((keys: string[]) => {
        setKeyboardShortcuts((prevShortcuts) =>
            prevShortcuts.filter(
                (shortcut) => !arraysEqual(shortcut.keySequence, keys),
            ),
        );
    }, []);

    const arraysEqual = (a: string[], b: string[]) => {
        if (a.length !== b.length) {
            return false;
        }

        return a.every((value, index) => value === b[index]);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            const activeElement = document.activeElement as HTMLElement;

            if (
                activeElement &&
                (activeElement.isContentEditable ||
                    ['INPUT', 'SELECT', 'TEXTAREA'].includes(
                        activeElement.tagName,
                    ))
            ) {
                if (key === 'escape') {
                    activeElement.blur();
                }

                return;
            }

            const newPressedKeys = [...pressedKeys, key];

            setPressedKeys(() => newPressedKeys);

            keyboardShortcuts.forEach(({ keySequence, action }) => {
                if (arraysEqual(keySequence, newPressedKeys)) {
                    action();
                    event.preventDefault();
                    resetKeys();
                }
            });

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const newTimeoutId = setTimeout(resetKeys, TIMEOUT_MS);
            setTimeoutId(newTimeoutId);
        };

        const resetKeys = () => {
            setPressedKeys([]);
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [pressedKeys, keyboardShortcuts, timeoutId]);

    return (
        <KeyboardShortcutsContext.Provider
            value={{
                registerKeyboardShortcut,
                unregisterKeyboardShortcut,
            }}
        >
            {children}
        </KeyboardShortcutsContext.Provider>
    );
}
