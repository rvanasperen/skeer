import GuestLayout from '@/Layouts/GuestLayout';
import { ReactNode } from 'react';

function Index() {
    return (
        <>
            <h1>Index Page</h1>
        </>
    );
}

Index.layout = (page: ReactNode) => <GuestLayout>{page}</GuestLayout>;

export default Index;
