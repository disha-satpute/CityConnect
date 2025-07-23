'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { UploadCloud } from 'lucide-react';


export default function ReportPage() {
  const [form, setForm] = useState({ title: '', description: '', image: null });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form); // later connect with backend
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-blue-600"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Report a Civic Issue
      </motion.h1>

      <form
        className="bg-white shadow-md rounded-2xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Input name="title" value={form.title} onChange={handleChange} placeholder="E.g., Garbage dump near Sector 7" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the issue in detail..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attach Image (optional)</label>
          <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded-md" />
        </div>

        <Button type="submit" className="w-full flex items-center justify-center gap-2">
          <UploadCloud className="w-4 h-4" />
          Submit Report
        </Button>
      </form>
    </div>
  );
}
