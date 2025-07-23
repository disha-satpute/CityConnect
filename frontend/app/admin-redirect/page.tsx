'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'superadmin') {
      router.push('/admin-dashboard/superadmin');
    } else if (role === 'department_admin') {
      router.push('/admin-dashboard/department-admin');
    } else if (role === 'officer') {
      router.push('/admin-dashboard/officer');

    }else {
      router.push('/admin-login');
    }
  }, []);

  return <div className="text-center mt-10">🔐 Redirecting based on role...</div>;
}
