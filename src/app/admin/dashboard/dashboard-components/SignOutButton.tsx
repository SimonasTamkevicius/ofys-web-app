"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors mt-6"
    >
      <div className="bg-gray-100 p-2 rounded-full">
        <LogOut className="h-5 w-5 text-gray-600" />
      </div>
      <span className="text-gray-700 font-medium">Logout</span>
    </div>
  );
}
