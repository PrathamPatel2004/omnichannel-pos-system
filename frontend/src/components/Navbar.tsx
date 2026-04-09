import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ active }: { active: string }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null; // no navbar if not logged in

  const getRoleLabel = () => {
    if (user.role === "admin") return "Admin";
    if (user.role === "manager") return "Manager";
    if (user.role === "cashier") return "Cashier";
    return "";
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 relative">
      
      {/* LEFT: Active Page */}
      <h1 className="text-lg font-semibold">{active}</h1>

      {/* RIGHT: User Info */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {getRoleLabel()}: {user.fname}
        </span>

        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full cursor-pointer"
        >
          {user.fname?.charAt(0).toUpperCase()}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-6 top-16 w-40 bg-white border rounded shadow-md">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}