'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    department_id: '',
    referral_code: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => router.push('/admin-login'), 1500);

    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-800">Admin Signup</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <input type="text" name="first_name" placeholder="First Name"
          className="w-full p-2 mb-3 border rounded"
          value={formData.first_name} onChange={handleChange} />

        <input type="text" name="last_name" placeholder="Last Name"
          className="w-full p-2 mb-3 border rounded"
          value={formData.last_name} onChange={handleChange} />

        <input type="text" name="username" placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          value={formData.username} onChange={handleChange} />

        <input type="email" name="email" placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={formData.email} onChange={handleChange} />

        <input type="password" name="password" placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={formData.password} onChange={handleChange} />

        <select name="role"
          className="w-full p-2 mb-3 border rounded"
          value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="superadmin">Super Admin</option>
          <option value="department_admin">Department Admin</option>
          <option value="officer">Officer</option>
        </select>



        <input type="text" name="referral_code" placeholder="Referral Code"
          className="w-full p-2 mb-4 border rounded"
          value={formData.referral_code} onChange={handleChange} />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push('/admin-login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
