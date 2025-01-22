import '../css/app.css';
import './bootstrap';

import { KeyboardShortcutsProvider } from '@/Components/Providers/KeyboardShortcutsProvider';
import { NotificationsProvider } from '@/Components/Providers/NotificationsProvider';
import AppLayout from '@/Layouts/AppLayout';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );

        console.log(page);

        // @ts-expect-error Variable 'page' is of unknown type
        page.default.layout ??= (page: ReactNode) => (
            <AppLayout>{page}</AppLayout>
        );

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <NotificationsProvider>
                <KeyboardShortcutsProvider>
                    <App {...props} />
                </KeyboardShortcutsProvider>
            </NotificationsProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
}).then(() => {
    // console.log('Inertia app ready');
});
