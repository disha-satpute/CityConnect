'use client';

import {
  FileText,
  CheckCircle,
  Clock,
  Users,
  Eye,
  LayoutDashboard,
  ClipboardList,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Issues', value: '1,247', change: '+12%', icon: <FileText className="text-blue-600" /> },
    { label: 'Resolved Issues', value: '1,089', change: '+8%', icon: <CheckCircle className="text-green-600" /> },
    { label: 'Pending Tasks', value: '158', change: '-3%', icon: <Clock className="text-yellow-500" /> },
    { label: 'Active Citizens', value: '15,623', change: '+15%', icon: <Users className="text-purple-600" /> },
  ];

  const monthlyData = [
    { month: 'Jan', issues: 120 },
    { month: 'Feb', issues: 98 },
    { month: 'Mar', issues: 140 },
    { month: 'Apr', issues: 160 },
    { month: 'May', issues: 180 },
    { month: 'Jun', issues: 200 },
  ];

  const reports = [
    { id: 'RPT-001', issue: 'Pothole on Main Street', department: 'Roads', location: 'Main St & 5th Ave', status: 'Pending', date: '2024-01-15' },
    { id: 'RPT-002', issue: 'Broken streetlight', department: 'Public Safety', location: 'Oak Street', status: 'Resolved', date: '2024-01-14' },
    { id: 'RPT-003', issue: 'Overflowing trash bins', department: 'Sanitation', location: 'Central Park', status: 'Pending', date: '2024-01-14' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">Admin Dashboard</div>
        <Link href="/">
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-all">
            ⬅ Back to Home
          </button>
        </Link>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6 font-bold text-blue-600 text-xl">CityConnect</div>
          <nav className="px-4">
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              <li className="bg-purple-100 rounded-md px-3 py-2 flex items-center gap-2 text-purple-700">
                <LayoutDashboard className="w-5 h-5" />
                Overview
              </li>
              <li className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-md">
                <ClipboardList className="w-5 h-5" />
                Reported Issues
              </li>
              <li className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-md">
                <Clock className="w-5 h-5" />
                Tasks
              </li>
              <li className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-md">
                <Settings className="w-5 h-5" />
                Settings
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview 📊</h1>
            <div className="hidden sm:block text-sm text-gray-500">Monitor city services and citizen engagement</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-green-600">{stat.change} from last month</div>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700">Avg Response Time</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">3.4 hrs</p>
              <p className="text-sm text-gray-500">Across all departments</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700">Feedback Score</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">4.6 / 5</p>
              <p className="text-sm text-gray-500">Based on 2,135 ratings</p>
            </div>
          </div>

          {/* Monthly Issue Trends Chart */}
          <div className="bg-white shadow rounded-lg p-6 mt-10">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📈 Monthly Issue Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issues" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Reports */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📝 Recent Reports</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Report ID</th>
                    <th className="px-4 py-3 text-left">Issue</th>
                    <th className="px-4 py-3 text-left">Department</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {reports.map((report) => (
                    <tr key={report.id} className="border-t">
                      <td className="px-4 py-3">{report.id}</td>
                      <td className="px-4 py-3">{report.issue}</td>
                      <td className="px-4 py-3">{report.department}</td>
                      <td className="px-4 py-3">{report.location}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full ${
                            report.status === 'Resolved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{report.date}</td>
                      <td className="px-4 py-3">
                        <Eye className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-800" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
