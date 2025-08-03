"use client";

import {  Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function LoginModal() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => {
          const dummyUser = { name: "Vaishnavi", email: "vaishnavi@example.com" };
          localStorage.setItem("user", JSON.stringify(dummyUser));
          window.location.reload(); // Reload to show circle after login
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg">
            {user.name[0].toUpperCase()}
          </div>
          <span className="text-xs mt-1">Profile</span>
        </div>
      </DialogTrigger>
      <DialogContent className="p-4 rounded-xl shadow-md w-[300px]">
        <h2 className="text-lg font-semibold mb-2">User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload(); // logout
          }}
        >
          Logout
        </button>
      </DialogContent>
    </Dialog>
  );
}
