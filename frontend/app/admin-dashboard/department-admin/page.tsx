// /app/admin-dashboard/department-admin/page.tsx
'use client'

export default function DepartmentAdminDashboard() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-green-700">🏢 Department Admin Dashboard</h1>
      <p className="mb-6 text-gray-700">Manage your department’s activities and officers.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Department Officers" value="6" link="/admin-dashboard/department-admin/officers" />
        <DashboardCard title="Pending Issues" value="27" link="/admin-dashboard/department-admin/complaints" />
      </div>
    </main>
  )
}

function DashboardCard({ title, value, link }: { title: string; value: string; link: string }) {
  return (
    <a href={link} className="bg-white shadow p-6 rounded hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-2xl text-green-600 font-bold">{value}</p>
    </a>
  )
}
