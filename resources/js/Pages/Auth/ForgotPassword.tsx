import InputError from '@/Components/InputError';
import { Button, Input, Label } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
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
        <GuestLayout>
            <Head title="Forgot Password" />

            <form
                className="mx-auto max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="text-sm">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="text-sm text-green-400">{status}</div>
                )}

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

                <Button disabled={processing}>Email Password Reset Link</Button>
            </form>
        </GuestLayout>
    );
}
