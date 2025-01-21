import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

export type Shortcut = {
    keys: string[];
    action: () => void;
};

type ShortcutsContextType = {
    registerShortcut: (shortcut: Shortcut) => void;
    unregisterShortcut: (keys: string[]) => void;
};

const ShortcutsContext = createContext<ShortcutsContextType | undefined>(
    undefined,
);

export function useShortcutsContext() {
    const context = useContext(ShortcutsContext);

    if (!context) {
        throw new Error(
            'useShortcutsContext must be used within a ShortcutsProvider',
        );
    }

    return context;
}

export function ShortcutsProvider({ children }: PropsWithChildren) {
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const TIMEOUT_MS = 1000;

    const registerShortcut = useCallback((shortcut: Shortcut) => {
        setShortcuts((prevShortcuts) => [...prevShortcuts, shortcut]);
    }, []);

    const unregisterShortcut = useCallback((keys: string[]) => {
        setShortcuts((prevShortcuts) =>
            prevShortcuts.filter(
                (shortcut) => !arraysEqual(shortcut.keys, keys),
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

            shortcuts.forEach(({ keys, action }) => {
                if (arraysEqual(keys, newPressedKeys)) {
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
    }, [pressedKeys, shortcuts, timeoutId]);

    return (
        <ShortcutsContext.Provider
            value={{ registerShortcut, unregisterShortcut }}
        >
            {children}
        </ShortcutsContext.Provider>
    );
}
