import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="max-w-xl space-y-8">
                <div className="text-xl font-bold">Dashboard</div>

                <div>todo</div>
            </div>
        </AuthenticatedLayout>
    );
}
