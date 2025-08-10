"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  const fetchProfile = async () => {
    const res = await fetch("http://localhost:5000/api/admin/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    const data = await res.json();
    setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow p-4 rounded">
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Department ID:</strong> {profile.department_id || "N/A"}</p>
      </div>
    </div>
  );
}
