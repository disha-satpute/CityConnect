"use client";

import React, { useState } from "react";
import { Search, Bell, LogOut, Settings, MessageSquare, BarChart3, Home, FileText, ChevronDown, Eye, Send, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast, { Toaster } from "react-hot-toast";

// Dummy complaints data
const initialComplaints = [
  {
    id: "CMP001",
    title: "Streetlight not working",
    department: "Electrical",
    status: "Pending",
    date: "2025-08-01",
    complainant: "John Doe",
    contact: "9876543210",
    description: "Streetlight near park has been out for 3 days.",
    location: "Park Avenue, Sector 5",
  },
  {
    id: "CMP002",
    title: "Garbage collection delay",
    department: "Sanitation",
    status: "Resolved",
    date: "2025-07-29",
    complainant: "Priya Sharma",
    contact: "9123456780",
    description: "Garbage has not been collected for 2 days.",
    location: "Green Street, Block A",
  },
  {
    id: "CMP003",
    title: "Potholes on road",
    department: "Roads",
    status: "In Progress",
    date: "2025-08-03",
    complainant: "Rahul Singh",
    contact: "9988776655",
    description: "Multiple potholes on the main road causing traffic jams.",
    location: "MG Road, Sector 2",
  },
];

// Chart colors
const COLORS = ["#10b981", "#3b82f6", "#facc15"];

export default function DepartmentAdminDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const totalComplaintsThisMonth = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  const categoryData = [
    { name: "Resolved", value: resolvedCount },
    { name: "In Progress", value: complaints.filter((c) => c.status === "In Progress").length },
    { name: "Pending", value: complaints.filter((c) => c.status === "Pending").length },
  ];

  const monthlyPerformance = [
    { month: "Jan", resolved: 20 },
    { month: "Feb", resolved: 35 },
    { month: "Mar", resolved: 25 },
    { month: "Apr", resolved: 30 },
    { month: "May", resolved: 40 },
    { month: "Jun", resolved: 28 },
    { month: "Jul", resolved: 32 },
    { month: "Aug", resolved: resolvedCount },
  ];

  const markResolved = (id) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Resolved" } : c))
    );
    toast.success("Complaint marked as resolved");
  };

  const forwardToSuperAdmin = (id) => {
    toast.success("Complaint forwarded to Super Admin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold border-b">Dept Admin</div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { name: "Dashboard", icon: Home },
            { name: "Complaints", icon: FileText },
            { name: "Reports", icon: BarChart3 },
            { name: "Messages", icon: MessageSquare },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <button key={item.name} className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-green-100 text-gray-700">
              <item.icon className="w-5 h-5 mr-3" /> {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-red-100 text-red-600">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input type="text" placeholder="Search complaints..." className="bg-transparent outline-none w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <div className="relative">
              <button className="flex items-center">
                <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              {/* Dropdown could be added here */}
            </div>
          </div>
        </header>

        {/* Dashboard Widgets */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-500">Total Complaints</h3>
            <p className="text-2xl font-bold">{totalComplaintsThisMonth}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-500">Resolved Complaints</h3>
            <p className="text-2xl font-bold">{resolvedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="p-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="resolved" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.id}</td>
                    <td className="px-4 py-2">{c.title}</td>
                    <td className="px-4 py-2">{c.department}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : c.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{c.date}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => { setSelectedComplaint(c); setShowModal(true); }}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => forwardToSuperAdmin(c.id)}
                        className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => markResolved(c.id)}
                        className="px-2 py-1 bg-green-100 hover:bg-green-200 rounded"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedComplaint && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="font-bold mb-2">Complaint Details</h3>
              <p><strong>ID:</strong> {selectedComplaint.id}</p>
              <p><strong>Title:</strong> {selectedComplaint.title}</p>
              <p><strong>Complainant:</strong> {selectedComplaint.complainant}</p>
              <p><strong>Contact:</strong> {selectedComplaint.contact}</p>
              <p><strong>Description:</strong> {selectedComplaint.description}</p>
              <p><strong>Date:</strong> {selectedComplaint.date}</p>
              <p><strong>Location:</strong> {selectedComplaint.location}</p>

              <textarea
                placeholder="Add notes..."
                className="mt-3 w-full border rounded p-2 text-sm"
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => { setShowModal(false); }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  onClick={() => { forwardToSuperAdmin(selectedComplaint.id); setShowModal(false); }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Forward
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}