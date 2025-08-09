'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Landmark, Home, Shield } from 'lucide-react'; // icon pack

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    gender: '',
    country: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    phoneNumber: '',
    mobileNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  const fieldIcons: Record<string, JSX.Element> = {
    username: <User size={18} className="text-blue-700" />,
    name: <User size={18} className="text-blue-700" />,
    gender: <User size={18} className="text-blue-700" />,
    country: <Globe size={18} className="text-blue-700" />,
    state: <MapPin size={18} className="text-blue-700" />,
    district: <Landmark size={18} className="text-blue-700" />,
    pincode: <Shield size={18} className="text-blue-700" />,
    address: <Home size={18} className="text-blue-700" />,
    phoneNumber: <Phone size={18} className="text-blue-700" />,
    mobileNumber: <Phone size={18} className="text-blue-700" />,
    email: <Mail size={18} className="text-blue-700" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: 'Username', name: 'username', type: 'text', required: true },
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Gender', name: 'gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
            { label: 'Country', name: 'country', type: 'text', required: true },
            { label: 'State', name: 'state', type: 'text', required: true },
            { label: 'District', name: 'district', type: 'text', required: true },
            { label: 'Pincode', name: 'pincode', type: 'text', required: false },
            { label: 'Address', name: 'address', type: 'textarea', required: true },
            { label: 'Phone number', name: 'phoneNumber', type: 'text', required: false },
            { label: 'Mobile number', name: 'mobileNumber', type: 'text', required: true },
            { label: 'E-mail address', name: 'email', type: 'email', required: true },
          ].map((field, idx) => (
            <div key={idx} className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-600"> *</span>}
              </label>
              <div className="flex items-center gap-2">
                <span>{fieldIcons[field.name]}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700"
                    required={field.required}
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700"
                    required={field.required}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="col-span-full mt-6 text-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-8 rounded-full shadow-md transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
