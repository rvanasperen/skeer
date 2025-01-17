import {
    Button,
    Checkbox,
    Input,
    InputError,
    Label,
} from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <form
                className="mx-auto max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
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

                <div>
                    <Label htmlFor="password" value="Password" />
                    <Input
                        autoComplete="current-password"
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

                <Label className="flex items-center gap-2">
                    <Checkbox
                        checked={data.remember}
                        id="remember"
                        name="remember"
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <div className="text-sm">Remember me</div>
                </Label>

                <div className="flex items-center justify-between">
                    <Button disabled={processing}>Login</Button>

                    {canResetPassword && (
                        <Link href={route('password.request')}>
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </form>
        </GuestLayout>
    );
}
