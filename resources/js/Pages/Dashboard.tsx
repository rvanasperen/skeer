import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div>Dashboard page</div>
        </AuthenticatedLayout>
    );
}
