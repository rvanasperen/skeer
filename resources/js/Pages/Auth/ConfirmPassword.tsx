import InputError from '@/Components/InputError';
import { Button, Input, Label } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        password: string;
    }>({
        password: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <form
                className="mx-auto max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="text-sm">
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </div>

                <div>
                    <Label htmlFor="password" value="Password" />
                    <Input
                        autoComplete="current-password"
                        className="mt-1 block w-full"
                        autoFocus={true}
                        id="password"
                        name="password"
                        onChange={(e) => setData('password', e.target.value)}
                        required={true}
                        type="password"
                        value={data.password}
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>

                <Button disabled={processing}>Confirm</Button>
            </form>
        </GuestLayout>
    );
}
