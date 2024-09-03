import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useSession = () => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/'); // Redirect to login if no token
                return;
            }

            try {
                const res = await fetch('http://127.0.0.1:5001/web-auction-page/us-central1/api/auth/role', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setRole(data.role);

                    // Redirect based on role
                    if (data.role === 'admin') {
                        router.push('/admin');
                    } else if (data.role === 'regular') {
                        router.push('/user');
                    } else {
                        setError('Unauthorized');
                        router.push('/login');
                    }
                } else {
                    setError('Failed to retrieve role');
                    router.push('/login');
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [router]);

    return { role, loading, error };
};

export default useSession;
