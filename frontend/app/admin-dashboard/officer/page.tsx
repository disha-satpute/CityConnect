'use client';

import { Card, CardContent, CardHeader, CardTitle  } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Bell, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfficerDashboard() {
  const [stats, setStats] = useState({
    total: 120,
    resolved: 80,
    pending: 30,
    escalated: 10,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900">Officer Admin Dashboard</h1>
        <p className="text-blue-700 mt-2">Manage and monitor complaints assigned to your department</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-3">
            <Bell className="text-blue-500" />
            <CardTitle>Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-3">
            <CheckCircle className="text-green-500" />
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">{stats.resolved}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-3">
            <Shield className="text-yellow-500" />
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-3">
            <AlertCircle className="text-red-500" />
            <CardTitle>Escalated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">{stats.escalated}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex justify-center">
        <Button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 shadow">
          View Complaints
        </Button>
      </div>
    </div>
  );
}
