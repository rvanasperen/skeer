import User from '@/Models/User';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: string;
        // todo: type (success, error, warning, info, nuclear etc)
    };
};
