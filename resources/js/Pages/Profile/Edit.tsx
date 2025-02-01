import { Card } from '@/Components/UI';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Profile" />

            <div className="max-w-xl space-y-4 xl:space-y-8">
                <h2 className="text-3xl font-bold">Profile</h2>

                <Card>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </Card>
                <Card>
                    <UpdatePasswordForm />
                </Card>
                <Card>
                    <DeleteUserForm />
                </Card>
            </div>
        </>
    );
}
