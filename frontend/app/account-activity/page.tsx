'use client';

import { useEffect, useState } from 'react';
import { User, Clock, LogIn, Globe, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Shield, Activity } from 'lucide-react';

interface LoginRecord {
  loginId: string;
  dateTime: string;
  actionName: string;
  ipAddress: string;
  status?: string;
}

export default function LoginHistory() {
  const [data, setData] = useState<LoginRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with actual API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch('/api/login-history');
        // const result = await response.json();
        // setData(result.data);
        // setTotalPages(result.totalPages);
        setData([]); // Empty array for now
        setTotalPages(1);
      } catch (error) {
        console.error('Error fetching login history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const getStatusColor = (status?: string) => {
    if (!status) return '';
    if (status.includes('Processing')) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="p-8 pb-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Shield className="text-blue-600 w-8 h-8" />
              Account Activity
            </h2>
            <p className="text-gray-500 mt-1">Recent login attempts and sessions</p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <span className="font-medium">
              {isLoading ? 'Loading...' : `${data.length} entries`}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>Login ID</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Date & Time</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    <span>Action Name</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    <span>IP Address</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Loading login history...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No login records found
                  </td>
                </tr>
              ) : (
                data.map((record, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">
                      {record.loginId}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-700">
                      {record.dateTime}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {record.actionName}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-700">
                      {record.ipAddress}
                    </td>
                    <td className={`py-4 px-6 whitespace-nowrap ${getStatusColor(record.status)}`}>
                      {record.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && data.length > 0 && (
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{data.length}</span> of{' '}
              <span className="font-medium">{data.length}</span> entries
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-2 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                className="p-2 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="px-4 py-1 bg-blue-600 text-white rounded-md">
                {currentPage}
              </div>
              <button
                className="p-2 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
              <button
                className="p-2 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}