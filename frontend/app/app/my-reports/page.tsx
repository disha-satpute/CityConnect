'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { BadgeCheck, Clock, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { Progress } from '../../components/ui/progress'; // Optional progress bar

const mockReports = [
  {
    id: 1,
    title: 'Pothole near Main Road',
    description: 'Large pothole making it unsafe for bikers.',
    location: 'Sector 12, Pune',
    date: '2025-07-20',
    status: 'Resolved',
    progress: 100,
  },
  {
    id: 2,
    title: 'Street Light Not Working',
    description: 'Street light near the park is out for 2 weeks.',
    location: 'MG Road, Pune',
    date: '2025-07-18',
    status: 'Pending',
    progress: 45,
  },
  {
    id: 3,
    title: 'Garbage not collected',
    description: 'Overflowing bins since last 3 days.',
    location: 'Kothrud Depot, Pune',
    date: '2025-07-15',
    status: 'In Progress',
    progress: 70,
  },
];

const statusColor = {
  Resolved: 'text-green-600 bg-green-100',
  Pending: 'text-yellow-600 bg-yellow-100',
  'In Progress': 'text-blue-600 bg-blue-100',
};

const statusIcon = {
  Resolved: <CheckCircle className="w-4 h-4 mr-1" />,
  Pending: <Loader2 className="w-4 h-4 mr-1 animate-spin" />,
  'In Progress': <Loader2 className="w-4 h-4 mr-1 animate-pulse" />,
};

export default function MyReportsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-600 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Reported Issues
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="hover:scale-[1.02] transition-transform duration-300 border-l-4 border-blue-500 shadow-xl bg-white rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">{report.title}</h2>
                <p className="text-sm text-gray-600">{report.description}</p>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <MapPin className="w-4 h-4" />
                  {report.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <Clock className="w-4 h-4" />
                  Reported on: {report.date}
                </div>
                <div
                  className={`flex items-center justify-start text-sm font-medium rounded-full px-2 py-1 w-fit ${statusColor[report.status]}`}
                >
                  {statusIcon[report.status]} {report.status}
                </div>
                <div className="pt-2">
                  <Progress value={report.progress} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
