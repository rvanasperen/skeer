import { Button, Input, InputError, Label } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<{
        email: string;
    }>({
        email: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="space-y-4 sm:mx-auto sm:max-w-md">
                <div className="text-xl">Forgot Password</div>

                <div className="text-sm">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="text-sm text-green-400">{status}</div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <Input
                            autoComplete="username"
                            autoFocus={true}
                            className="mt-1 block w-full"
                            id="email"
                            name="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required={true}
                            type="email"
                            value={data.email}
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <Button disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </form>
            </div>
        </>
    );
}

ForgotPassword.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default ForgotPassword;
