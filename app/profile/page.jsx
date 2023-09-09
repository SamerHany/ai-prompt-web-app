'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user.id) {
            router.push(`/profile/${session.user.id}`);
        }
        else {
            router.push('/');
        }
    })
}

export default Profile