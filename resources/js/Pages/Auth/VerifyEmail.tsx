import { Button } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />

            <div className="space-y-4 sm:mx-auto sm:max-w-md">
                <div className="text-xl">Verify Email</div>

                <div className="text-sm">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="text-sm text-green-400">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between">
                        <Button disabled={processing}>
                            Resend Verification Email
                        </Button>

                        <Link href={route('logout')} method="post">
                            <Button theme="danger">Log Out</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

VerifyEmail.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default VerifyEmail;
