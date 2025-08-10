'use client';
import { useEffect, useState } from 'react';

export default function ManageDepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchDepartments(); }, []);

  async function fetchDepartments() {
    try {
      const res = await fetch('/api/departments');
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function createDepartment() {
    if (!name.trim()) return alert('Name required');
    setLoading(true);
    try {
      const res = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: desc.trim() })
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Create failed');
      setName(''); setDesc('');
      fetchDepartments();
    } catch (err:any) {
      alert(err.message || 'Error creating');
    } finally { setLoading(false); }
  }

  async function updateDepartment(id:number, newName:string, newDesc:string) {
    try {
      const res = await fetch(`/api/departments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, description: newDesc })
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Update failed');
      fetchDepartments();
    } catch (err:any) {
      alert(err.message || 'Error updating');
    }
  }

  async function deleteDepartment(id:number) {
    if (!confirm('Delete?')) return;
    try {
      const res = await fetch(`/api/departments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).message || 'Delete failed');
      fetchDepartments();
    } catch (err:any) {
      alert(err.message || 'Error deleting');
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Departments</h1>

      <div className="mb-4 flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border p-2 rounded flex-1"/>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (optional)" className="border p-2 rounded flex-1"/>
        <button onClick={createDepartment} disabled={loading} className="bg-green-600 text-white px-4 rounded">Add</button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr><th className="p-2">ID</th><th className="p-2">Name</th><th className="p-2">Description</th><th className="p-2">Actions</th></tr>
          </thead>
          <tbody>
            {departments.map(d => (
              <DeptRow key={d.id} dept={d} onUpdate={updateDepartment} onDelete={deleteDepartment} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeptRow({ dept, onUpdate, onDelete }: any) {
  const [name, setName] = useState(dept.name);
  const [desc, setDesc] = useState(dept.description || '');
  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="p-2">{dept.id}</td>
      <td className="p-2"><input value={name} onChange={e=>setName(e.target.value)} onBlur={()=>onUpdate(dept.id, name, desc)} className="border p-1 rounded w-full" /></td>
      <td className="p-2"><input value={desc} onChange={e=>setDesc(e.target.value)} onBlur={()=>onUpdate(dept.id, name, desc)} className="border p-1 rounded w-full" /></td>
      <td className="p-2"><button onClick={()=>onDelete(dept.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button></td>
    </tr>
  );
}
