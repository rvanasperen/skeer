import '../css/app.css';
import './bootstrap';

import { KeyboardShortcutsProvider } from '@/Components/Providers/KeyboardShortcutsProvider';
import { NotificationsProvider } from '@/Components/Providers/NotificationsProvider';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
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
