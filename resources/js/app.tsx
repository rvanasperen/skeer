import '../css/app.css';
import './bootstrap';

import { KeyboardShortcutsProvider } from '@/Components/Providers/KeyboardShortcutsProvider';
import { MobileNavigationProvider } from '@/Components/Providers/MobileNavigationProvider';
import { NotificationsProvider } from '@/Components/Providers/NotificationsProvider';
import AppLayout from '@/Layouts/AppLayout';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { JSXElementConstructor, PropsWithChildren, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );

        // @ts-expect-error Variable 'page' is of unknown type
        page.default.layout ??= (page: ReactNode) => (
            <AppLayout>{page}</AppLayout>
        );

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        const withProviders = (
            app: ReactNode,
            providers: JSXElementConstructor<PropsWithChildren>[],
        ) =>
            providers.reduce((acc, Provider) => {
                return <Provider>{acc}</Provider>;
            }, app);

        root.render(
            withProviders(<App {...props} />, [
                NotificationsProvider,
                KeyboardShortcutsProvider,
                MobileNavigationProvider,
            ]),
        );
    },
    progress: {
        color: '#4B5563',
    },
}).then(() => {
    // console.log('Inertia app ready');
});
