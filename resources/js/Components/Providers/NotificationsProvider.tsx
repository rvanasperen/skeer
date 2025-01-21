import { createContext, PropsWithChildren, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export type NotificationData = {
    message: string;
    type: 'success' | 'error';
};

type NotificationsContextType = {
    showNotification: (notification: NotificationData) => void;
};

const NotificationsContext = createContext<
    NotificationsContextType | undefined
>(undefined);

export function useNotificationsContext() {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error(
            'useNotificationsContext must be used within a NotificationsProvider',
        );
    }

    return context;
}

export function NotificationsProvider({ children }: PropsWithChildren) {
    const showNotification = (notification: NotificationData) => {
        if (notification.type === 'success') {
            toast.success(notification.message);
        } else {
            toast.error(notification.message);
        }
    };

    return (
        <NotificationsContext.Provider value={{ showNotification }}>
            <ToastContainer theme="dark" />
            {children}
        </NotificationsContext.Provider>
    );
}
