"use client";

import { useUserStore } from "@/stores/user.store";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Header() {
  const user = useUserStore(state => state.user);

  const onLogout = () => {
    Cookies.remove("auth-user");
    toast.success("Logged out successfully!");
    useUserStore.persist.clearStorage();
  };

  const noUserLinks = (
    <>
      <Link className="hover:text-amber-700 transition" href="/login">
        Login
      </Link>
      <Link className="hover:text-amber-700 transition" href="/register">
        Register
      </Link>
    </>
  );

  const userLinks = (
    <>
      <Link className="hover:text-amber-700 transition" href="/profile">
        Profile
      </Link>
      <Link className="hover:text-amber-700 transition" href="/devices">
        Devices
      </Link>
      <Link className="hover:text-amber-700 transition" href="/settings">
        Settings
      </Link>
      <a
        onClick={() => onLogout()}
        className="hover:text-amber-700 transition"
        href="/settings"
      >
        Logout
      </a>
    </>
  );

  return (
    <header className="flex justify-between items-center px-4 py-2 ">
      <div>
        <h1 className="text-3xl bg-blue-300 p-3 shadow-[5px_5px_blue] rounded-xl">
          B2 Portal
        </h1>
      </div>
      <nav className="flex gap-3 align-middle  bg-blue-300 p-3 shadow-[5px_5px_blue] rounded-xl  text-lg">
        {user ? userLinks : noUserLinks}
      </nav>
    </header>
  );
}
