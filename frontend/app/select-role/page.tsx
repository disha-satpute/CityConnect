'use client';

import { useRouter } from 'next/navigation';
import { Card } from '../../components/ui/card';

const roles = [
{
label: 'User Login',
route: '/login/user',
icon: 'https://img.icons8.com/ios-filled/100/user.png',
},
{
label: 'Super Admin',
route: 'app/admin-dashboard/officer/page.tsx',
icon: 'https://img.icons8.com/ios-filled/100/security-shield-green.png',
},
{
label: 'Department Admin',
route: '/department/page',
icon: 'https://img.icons8.com/ios-filled/100/organization.png',
},
{
label: 'Officer Admin',
route: '/officer/page',
icon: 'https://img.icons8.com/ios-filled/100/administrator-male.png',
},
];

export default function SelectRolePage() {
const router = useRouter();

return (
<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4">
<h1 className="text-3xl font-bold text-blue-900 mb-2">Login</h1>
<h2 className="text-xl text-blue-700 font-semibold mb-10">
Select User Type
</h2>


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl w-full justify-items-center">
    {roles.map((role) => (
      <Card
        key={role.label}
        className="flex flex-col items-center cursor-pointer hover:shadow-2xl transition w-40 h-40 justify-center bg-blue-500 rounded-2xl shadow-md hover:bg-blue-600"
        onClick={() => router.push(role.route)}
      >
        <img
          src={role.icon}
          alt={role.label}
          className="w-14 h-14 mb-3 transition-transform hover:scale-110"
        />
        <span className="text-center text-sm font-medium text-white">
          {role.label}
        </span>
      </Card>
    ))}
  </div>
</div>
);
}