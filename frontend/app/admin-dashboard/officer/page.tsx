// /app/admin-dashboard/officer/page.tsx
'use client'

export default function OfficerDashboard() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">🛠️ Officer Dashboard</h1>
      <p className="mb-6 text-gray-700">View and resolve issues assigned to you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Assigned Issues" value="12" link="/admin-dashboard/officer/complaints" />
        <DashboardCard title="Submit Report" value="📝" link="/admin-dashboard/officer/reports" />
      </div>
    </main>
  )
}

function DashboardCard({ title, value, link }: { title: string; value: string; link: string }) {
  return (
    <a href={link} className="bg-white shadow p-6 rounded hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-2xl text-indigo-600 font-bold">{value}</p>
    </a>
  )
}
