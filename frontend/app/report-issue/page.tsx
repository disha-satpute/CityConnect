'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type CategoryKey = keyof typeof categories;

const categories = {
  "Garbage / कचरा / कचरा व्यवस्थापन": [
    "Uncollected garbage",
    "Overflowing bins",
    "Garbage burning issue"
  ],
  "Water / पाणी / जल आपूर्ति": [
    "Water leakage",
    "No water supply",
    "Contaminated water"
  ],
  "Road / रस्ते / सड़क": [
    "Potholes",
    "Broken footpaths",
    "Blocked drains"
  ],
  "Electricity / वीज / बिजली": [
    "Streetlight not working",
    "Loose wires",
    "No power"
  ]
};

const offices = ["PMC Head Office", "Ward Office 1", "Ward Office 2", "Zone Office"];

export default function GrievanceForm() {
  const [form, setForm] = useState({
    ministry: 'CityConnect Smart Services',
    category: '',
    subCategory: '',
    issue: '',
    office: '',
    remarks: '',
    document: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.category) newErrors.category = "Please select a category.";
    if (!form.subCategory) newErrors.subCategory = "Please select a subcategory.";
    if (!form.issue) newErrors.issue = "Please enter a specific issue.";
    if (!form.office) newErrors.office = "Please select an office.";
    if (!form.remarks || form.remarks.length < 10)
      newErrors.remarks = "Please enter grievance (min 10 characters).";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(form);
    alert("Your grievance has been submitted. Thank you!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto border border-blue-200 rounded-md shadow-lg p-8 bg-white transition duration-300">
        <h2 className="text-2xl font-semibold text-blue-900 mb-3">
          Grievance Registration Form / तक्रार फॉर्म / शिकायत फॉर्म
        </h2>
        <p className="text-xs text-blue-700 mb-5">
          Fields marked with <span className="text-red-600">*</span> are mandatory.
          कृपया सर्व आवश्यक माहिती भरा। कृपया सभी आवश्यक विवरण भरें।
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {/* Ministry */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              Ministry / Department मंत्रालय / विभाग <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={form.ministry}
              disabled
              className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              Main Category / मुख्य श्रेणी / मुख्य वर्गीकरण <span className="text-red-600">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Category --</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Subcategory */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              Subcategory / उप-श्रेणी / उपवर्ग <span className="text-red-600">*</span>
            </label>
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!form.category}
            >
              <option value="">-- Select Subcategory --</option>
              {form.category &&
                categories[form.category as CategoryKey].map((sub: string) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
            {errors.subCategory && <p className="text-red-600 text-xs mt-1">{errors.subCategory}</p>}
          </div>

          {/* Issue */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              Specific Issue / विशिष्ट समस्या / समस्या चुनें <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="issue"
              value={form.issue}
              onChange={handleChange}
              placeholder="e.g., Garbage not picked up from society"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.issue && <p className="text-red-600 text-xs mt-1">{errors.issue}</p>}
          </div>

          {/* Office */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              RO/SRO/Zone Office / कार्यालय निवडा / कार्यालय चुनें <span className="text-red-600">*</span>
            </label>
            <select
              name="office"
              value={form.office}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Office --</option>
              {offices.map((office) => (
                <option key={office} value={office}>{office}</option>
              ))}
            </select>
            {errors.office && <p className="text-red-600 text-xs mt-1">{errors.office}</p>}
          </div>

          {/* Remarks */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              Text of grievance / तक्रार तपशील / शिकायत का विवरण <span className="text-red-600">*</span>
            </label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={5}
              maxLength={2000}
              placeholder="Enter your complaint here..."
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-600">Max 2000 characters allowed.</span>
              <span className="text-gray-500">{2000 - form.remarks.length} characters left</span>
            </div>
            {errors.remarks && <p className="text-red-600 text-xs mt-1">{errors.remarks}</p>}
          </div>

          {/* Upload */}
          <div>
            <label className="font-semibold text-gray-800 block mb-1">
              Attach PDF document (optional)
            </label>
            <input
              type="file"
              name="document"
              accept=".pdf"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-blue-600 mt-1">Only PDF files up to 4MB allowed.</p>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <ArrowRight className="w-4 h-4" />
              Submit / सबमिट करें / सबमिट करा
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
