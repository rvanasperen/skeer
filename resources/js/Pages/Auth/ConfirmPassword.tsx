import { Button, Input, InputError, Label } from '@/Components/UI/Form';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

function ConfirmPassword() {
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
        <>
            <Head title="Confirm Password" />

            <div className="space-y-4 sm:mx-auto sm:max-w-md">
                <div className="text-xl">Confirm Password</div>

                <div className="text-sm">
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <Input
                            autoComplete="current-password"
                            className="mt-1 block w-full"
                            autoFocus={true}
                            id="password"
                            name="password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required={true}
                            type="password"
                            value={data.password}
                        />
                        <InputError
                            className="mt-2"
                            message={errors.password}
                        />
                    </div>

                    <Button disabled={processing}>Confirm</Button>
                </form>
            </div>
        </>
    );
}

ConfirmPassword.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default ConfirmPassword;
