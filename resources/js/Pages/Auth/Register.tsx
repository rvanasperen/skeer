import { Button, Input, InputError, Label } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form
                className="mx-auto max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <div>
                    <Label htmlFor="name" value="Name" />
                    <Input
                        autoComplete="name"
                        autoFocus={true}
                        className="mt-1 block w-full"
                        id="name"
                        name="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required={true}
                        value={data.name}
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="email" value="Email" />
                    <Input
                        autoComplete="username"
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
                        autoComplete="new-password"
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

                <div>
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
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Button disabled={processing}>Register</Button>

                    <Link href={route('login')}>Already registered?</Link>
                </div>
            </form>
        </GuestLayout>
    );
}
