import Modal from '@/Components/Modal';
import { Button, Input, InputError, Label } from '@/Components/UI/Form';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<{
        password: string;
    }>({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <div className={className}>
            <div className="text-lg">Delete Account</div>

            <div className="mt-1 text-sm text-gray-400">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                download any data or information that you wish to retain.
            </div>

            <Button
                className="mt-6"
                disabled={processing}
                onClick={confirmUserDeletion}
                theme="danger"
            >
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6 text-gray-100">
                    <div className="text-lg">
                        Are you sure you want to delete your account?
                    </div>

                    <div className="mt-1 text-sm text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </div>

                    <div className="mt-6">
                        <Label
                            className="sr-only"
                            htmlFor="password"
                            value="Password"
                        />
                        <Input
                            className="mt-1 block w-full"
                            id="password"
                            name="password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Password"
                            ref={passwordInput}
                            type="password"
                            value={data.password}
                        />
                        <InputError
                            className="mt-2"
                            message={errors.password}
                        />
                    </div>

                    <div className="mt-6 flex gap-4">
                        <Button disabled={processing} theme="danger">
                            Delete Account
                        </Button>

                        <Button onClick={closeModal} theme="secondary">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
