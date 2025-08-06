'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '../../../components/ui/card';

const roles = [
  {
    label: 'User Login',
    route: '/login/user',
    icon: '/icons/student.png',
  },
  {
    label: 'Super Admin',
    route: '/login/super',
    icon: '/icons/university.png',
  },
  {
    label: 'Department Admin',
    route: '/login/department',
    icon: '/icons/city-dept.png',
  },
  {
    label: 'Officer Admin',
    route: '/login/officer',
    icon: '/icons/employer.png',
  },
];

export default function SelectRolePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
        Login
      </h1>
      <h2 className="text-xl text-red-600 font-bold text-center mb-10">
        Select User Type
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl w-full justify-items-center">
        {roles.map((role) => (
          <Card
            key={role.label}
            className="flex flex-col items-center cursor-pointer hover:shadow-xl transition w-40 h-40 justify-center"
            onClick={() => router.push(role.route)}
          >
            <Image
              src={role.icon}
              alt={role.label}
              width={60}
              height={60}
              className="mb-3"
            />
            <span className="text-center text-sm font-medium text-gray-700">
              {role.label}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
