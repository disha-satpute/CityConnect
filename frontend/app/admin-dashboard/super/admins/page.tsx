"use client";
import { useEffect, useState } from "react";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const res = await fetch("http://localhost:5000/api/super/admins");
    const data = await res.json();
    setAdmins(data);
  };

  const deleteAdmin = async (id: number) => {
    await fetch(`http://localhost:5000/api/super/admins/${id}`, {
      method: "DELETE",
    });
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admins</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin: any) => (
            <tr key={admin.id}>
              <td className="border p-2">{admin.id}</td>
              <td className="border p-2">{admin.username}</td>
              <td className="border p-2">{admin.email}</td>
              <td className="border p-2">{admin.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => deleteAdmin(admin.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
