import { Listbox, ListboxItem } from "@heroui/react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard as Dashboard,
  Wrench,
  History,
  UserCircle,
  LogOut,
} from "lucide-react";
import Cookies from "js-cookie";

import AuthGuard from "@/guard/auth-guard";
import { useAppDispatch } from "@/stores/hooks";
import { authClear } from "@/stores/features/auth/auth-slice";
import { confirmSweat } from "@/utils/helpers/notify";

export default function LayoutDashboard() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Dashboard size={20} />,
      href: "/dashboard",
    },
    {
      key: "service",
      label: "Booking Service",
      icon: <Wrench size={20} />,
      href: "/customer/service",
    },
    {
      key: "history",
      label: "Riwayat Service",
      icon: <History size={20} />,
      href: "/customer/history",
    },
    {
      key: "profile",
      label: "Profil Saya",
      icon: <UserCircle size={20} />,
      href: "/customer/profile",
    },
  ];

  function handleLogout() {
    Cookies.remove("token");
    dispatch(authClear());
    localStorage.clear();
    navigate("/");
  }

  return (
    <AuthGuard>
      <div className="flex gap-6 container mx-auto py-8 px-4 h-screen">
        {/* Sidebar - Sebelah Kiri */}
        <div className="w-full max-w-[280px] border-r-1 border-divider pr-4 hidden md:block">
          <Listbox
            aria-label="User Menu"
            className="p-0 gap-2"
            selectedKeys={[pathname]}
            variant="flat"
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.href}
                as={Link}
                className={`${
                  pathname === item.href
                    ? "bg-danger/10 text-danger"
                    : "text-default-600"
                } h-12`}
                href={item.href}
                startContent={item.icon}
              >
                {item.label}
              </ListboxItem>
            ))}
          </Listbox>

          {/* Tombol Logout di paling bawah */}
          <div className="mt-auto pt-4 border-t-1 border-divider">
            <Listbox aria-label="Logout">
              <ListboxItem
                key="logout"
                className="text-danger h-12"
                color="danger"
                startContent={<LogOut size={20} />}
                onClick={() =>
                  confirmSweat(handleLogout, {
                    title: "Keluar dari Aplikasi?",
                    text: "Anda harus login kembali untuk mengakses data bengkel.",
                    icon: "question",
                    confirmButtonText: "Ya, Keluar",
                    cancelButtonText: "Batal",
                  })
                }
              >
                Keluar
              </ListboxItem>
            </Listbox>
          </div>
        </div>

        {/* Main Content - Sebelah Kanan */}
        <div className="flex-1 overflow-y-auto px-2">
          {/* <header className="flex justify-between items-center mb-6 pb-4 border-b-1 border-divider">
            <h2 className="text-2xl font-bold capitalize">
              {pathname.split("/").pop() || "Dashboard"}
            </h2>
            <div className="bg-default-100 p-2 rounded-full cursor-pointer">
              <Bell className="text-default-600" size={20} />
            </div>
          </header> */}

          <main className="animate-in fade-in duration-500">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
