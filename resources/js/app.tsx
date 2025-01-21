import '../css/app.css';
import './bootstrap';

import { ShortcutsProvider } from '@/Components/Providers/ShortcutsProvider';
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
            <ShortcutsProvider>
                <App {...props} />
            </ShortcutsProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
}).then(() => {
    // console.log('Inertia app ready');
});
