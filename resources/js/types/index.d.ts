import User from '@/Models/User';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        notification: {
            message: string;
            type: 'success' | 'error';
        };
    };
};
