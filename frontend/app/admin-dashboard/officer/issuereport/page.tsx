'use client';

import { useEffect, useState } from 'react';
import { Eye, X, Send, CheckCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '../../../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HistoryEntry {
  action: string;
  timestamp: string;
}

interface Issue {
  id: string;
  title: string;
  status: string;
  department: string;
  priority: string;
  date: string;
  location: string;
  history: HistoryEntry[];
}

const IssueReportsPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Load issues from localStorage (simulate DB)
  useEffect(() => {
    const savedIssues = localStorage.getItem('issues');
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    } else {
      // Dummy initial data
      const initialIssues: Issue[] = [
        {
          id: 'ISSUE001',
          title: 'Water leakage on Main St.',
          status: 'Open',
          department: 'Water',
          priority: 'High',
          date: '2025-08-01',
          location: 'Main St., Zone 3',
          history: [
            { action: 'Reported', timestamp: '2025-08-01 10:00' },
            { action: 'Forwarded to Dept Admin', timestamp: '2025-08-01 11:15' },
          ],
        },
        {
          id: 'ISSUE002',
          title: 'Street light not working',
          status: 'Resolved',
          department: 'PWD',
          priority: 'Low',
          date: '2025-07-30',
          location: '5th Ave, Sector B',
          history: [
            { action: 'Reported', timestamp: '2025-07-30 08:12' },
            { action: 'Resolved', timestamp: '2025-08-01 13:44' },
          ],
        },
      ];
      setIssues(initialIssues);
      localStorage.setItem('issues', JSON.stringify(initialIssues));
    }
  }, []);

  // Save updates to localStorage
  const updateIssues = (updatedList: Issue[]) => {
    setIssues(updatedList);
    localStorage.setItem('issues', JSON.stringify(updatedList));
  };

  const markResolved = (id: string) => {
    const updated = issues.map(issue =>
      issue.id === id
        ? {
            ...issue,
            status: 'Resolved',
            history: [...issue.history, { action: 'Resolved', timestamp: new Date().toLocaleString() }],
          }
        : issue
    );
    updateIssues(updated);
  };

  const forwardToDept = (id: string) => {
    const updated = issues.map(issue =>
      issue.id === id
        ? {
            ...issue,
            status: 'Forwarded',
            history: [...issue.history, { action: `Forwarded to ${issue.department} Dept Admin`, timestamp: new Date().toLocaleString() }],
          }
        : issue
    );
    updateIssues(updated);
  };

  // Graph Data
  const chartData = Object.values(
    issues.reduce((acc: any, issue) => {
      if (!acc[issue.department]) {
        acc[issue.department] = { name: issue.department, open: 0, resolved: 0 };
      }
      if (issue.status === 'Resolved') acc[issue.department].resolved += 1;
      else acc[issue.department].open += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📋 Issue Reports</h1>

      {/* Table */}
      <Card>
        <CardContent className="p-4 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map(issue => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.id}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.status}</TableCell>
                  <TableCell>{issue.department}</TableCell>
                  <TableCell>{issue.priority}</TableCell>
                  <TableCell>{issue.date}</TableCell>
                  <TableCell className="flex gap-2">
                    {/* View Details */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedIssue(issue)}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogTitle>Issue Details</DialogTitle>
                        <div className="space-y-2">
                          <p><strong>ID:</strong> {selectedIssue?.id}</p>
                          <p><strong>Title:</strong> {selectedIssue?.title}</p>
                          <p><strong>Status:</strong> {selectedIssue?.status}</p>
                          <p><strong>Department:</strong> {selectedIssue?.department}</p>
                          <p><strong>Priority:</strong> {selectedIssue?.priority}</p>
                          <p><strong>Date:</strong> {selectedIssue?.date}</p>
                          <p><strong>Location:</strong> {selectedIssue?.location}</p>
                          <h3 className="font-medium mt-4">Activity Timeline:</h3>
                          <ul className="list-disc ml-5 text-sm">
                            {selectedIssue?.history.map((h, i) => (
                              <li key={i}>{h.action} – {h.timestamp}</li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Resolve */}
                    {issue.status !== 'Resolved' && (
                      <Button variant="success" onClick={() => markResolved(issue.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Resolve
                      </Button>
                    )}

                    {/* Forward */}
                    {issue.status === 'Open' && (
                      <Button variant="secondary" onClick={() => forwardToDept(issue.id)}>
                        <Send className="w-4 h-4 mr-1" /> Forward
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Graph */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">📊 Issue Stats by Department</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="open" fill="#f97316" name="Open" />
            <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssueReportsPage;