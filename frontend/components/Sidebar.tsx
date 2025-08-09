'use client';

import Link from 'next/link';
import {
  Home,
  FileText,
  User,
  Edit,
  Lock,
  Power,
  ListChecks,
  MessageSquareWarning,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white font-semibold shadow-lg flex flex-col p-4 rounded-tr-3xl">
      {/* Top Navigation */}
      <Link href="/">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <Home className="mr-2 w-5 h-5" /> Dashboard
        </button>
      </Link>

      <Link href="/report-issue">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <MessageSquareWarning className="mr-2 w-5 h-5" /> Report Issue
        </button>
      </Link>

      <Link href="/my-reports">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <ListChecks className="mr-2 w-5 h-5" /> My Report
        </button>
      </Link>

      <Link href="/store">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <FileText className="mr-2 w-5 h-5" /> Eco Store
        </button>
      </Link>

      <Link href="/account-activity">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <User className="mr-2 w-5 h-5" /> Account Activity
        </button>
      </Link>

      <Link href="/edit-details">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <Edit className="mr-2 w-5 h-5" /> Edit Details
        </button>
      </Link>

      <Link href="/change-password">
        <button className="flex items-center w-full py-2 px-3 hover:bg-blue-700 rounded">
          <Lock className="mr-2 w-5 h-5" /> Change Password
        </button>
      </Link>

      {/* Sign Out */}
      <div className="mt-auto">
        <Link href="/logout">
          <button className="flex items-center w-full py-2 px-3 text-yellow-400 hover:text-yellow-500 hover:bg-blue-700 rounded">
            <Power className="mr-2 w-5 h-5" /> Sign out
          </button>
        </Link>
      </div>
    </div>
  );
}
