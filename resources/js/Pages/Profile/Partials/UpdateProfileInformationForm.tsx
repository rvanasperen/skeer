import { Button, Input, InputError, Label } from '@/Components/UI/Form';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<{
            name: string;
            email: string;
        }>({
            name: user.name,
            email: user.email,
        });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <div className={className}>
            <div className="text-lg">Profile Information</div>

            <div className="mt-1 text-sm text-gray-400">
                Update your account's profile information and email address.
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <Label htmlFor="name" value="Name" />
                    <Input
                        autoComplete="name"
                        autoFocus={true}
                        className="mt-1 block w-full"
                        id="name"
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
                        onChange={(e) => setData('email', e.target.value)}
                        required={true}
                        type="email"
                        value={data.email}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="space-y-2">
                        <div>Your email address is unverified.</div>

                        <Link
                            className="underline"
                            href={route('verification.send')}
                            method="post"
                        >
                            Resend Verification Email
                        </Link>

                        {status === 'verification-link-sent' && (
                            <div className="text-green-400">
                                A new verification link has been sent to your
                                email address!
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-green-400">Saved!</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
