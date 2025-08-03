'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, MapPin, Bug, FileImage } from 'lucide-react';

export default function ReportIssue() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    department: '',
    description: '',
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form); // Replace with API call
    alert("Report submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 flex justify-center items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Report an Issue <Bug className="text-red-500 w-5 h-5" />
          </h2>
          <p className="text-gray-600 mt-2">
            Help us improve your community by reporting issues that need attention
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="📍 Enter the location or address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-blue-500"
            required
          >
            <option value="">Select the relevant department</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Road Maintenance">Road Maintenance</option>
            <option value="Electricity">Electricity</option>
            <option value="Water Supply">Water Supply</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Please describe the issue in detail..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Upload Image (Optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-md file:px-4 file:py-2 file:bg-blue-100 file:text-blue-700 file:border-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <UploadCloud className="w-5 h-5" />
          Submit Report
        </button>
      </motion.form>
    </div>
  );
}
