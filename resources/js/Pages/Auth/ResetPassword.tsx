import { Button, Input, InputError, Label } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        token: string;
        email: string;
        password: string;
        password_confirmation: string;
    }>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form
                className="mx-auto max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <div>
                    <Label htmlFor="email" value="Email" />
                    <Input
                        autoComplete="username"
                        className="mt-1 block w-full"
                        disabled={true}
                        id="email"
                        name="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required={true}
                        type="email"
                        value={data.email}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <Label htmlFor="password" value="Password" />
                    <Input
                        autoComplete="new-password"
                        autoFocus={true}
                        className="mt-1 block w-full"
                        id="password"
                        name="password"
                        onChange={(e) => setData('password', e.target.value)}
                        required={true}
                        type="password"
                        value={data.password}
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div className="mt-4">
                    <Label
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <Input
                        autoComplete="new-password"
                        className="mt-1 block w-full"
                        id="password_confirmation"
                        name="password_confirmation"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required={true}
                        type="password"
                        value={data.password_confirmation}
                    />
                    <InputError
                        className="mt-2"
                        message={errors.password_confirmation}
                    />
                </div>

                <Button disabled={processing}>Reset Password</Button>
            </form>
        </GuestLayout>
    );
}
