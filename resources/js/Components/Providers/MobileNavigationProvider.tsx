import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

type MobileNavigationContextType = {
    showMobileNavigation: boolean;
    setShowMobileNavigation: Dispatch<SetStateAction<boolean>>;
};

const MobileNavigationContext = createContext<
    MobileNavigationContextType | undefined
>(undefined);

export function useMobileNavigationContext() {
    const context = useContext(MobileNavigationContext);

    if (!context) {
        throw new Error(
            'useMobileNavigationContext must be used within a MobileNavigationProvider',
        );
    }

    return context;
}

export function MobileNavigationProvider({ children }: PropsWithChildren) {
    const [showMobileNavigation, setShowMobileNavigation] =
        useState<boolean>(false);

    return (
        <MobileNavigationContext.Provider
            value={{ showMobileNavigation, setShowMobileNavigation }}
        >
            {children}
        </MobileNavigationContext.Provider>
    );
}
