import { Button, Listbox, ListboxItem } from "@heroui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard as Dashboard,
  Wrench,
  History,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";

import AuthGuard from "@/guard/auth-guard";
import { useAppDispatch } from "@/stores/hooks";
import { authClear } from "@/stores/features/auth/auth-slice";
import { confirmSweat } from "@/utils/helpers/notify";

export default function LayoutDashboard() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  function onNavigate(href: string) {
    navigate(href);
    setMobileMenuOpen(false);
  }

  return (
    <AuthGuard>
      <div className="flex gap-6 px-4 md:px-10 py-4 md:py-8 h-screen relative">
        {mobileMenuOpen && (
          <div
            aria-hidden="true"
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div
          className={`fixed md:hidden top-0 left-0 h-full w-[280px] bg-white z-50 border-r border-divider p-4 transition-transform duration-200 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-[#0B1C39]">Menu Member</h3>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setMobileMenuOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>

          <Listbox
            aria-label="User Menu Mobile"
            className="p-0 gap-2"
            selectedKeys={[pathname]}
            variant="flat"
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.href}
                className={`${
                  pathname === item.href
                    ? "bg-danger/10 text-danger"
                    : "text-default-600"
                } h-12`}
                startContent={item.icon}
                onClick={() => onNavigate(item.href)}
              >
                {item.label}
              </ListboxItem>
            ))}
          </Listbox>

          <div className="mt-6 pt-4 border-t border-divider">
            <Listbox aria-label="Logout Mobile">
              <ListboxItem
                key="logout-mobile"
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

        {/* Sidebar - Sebelah Kiri */}
        <div className="w-full max-w-[240px] border-r-1 border-divider pr-4 hidden md:block">
          <Listbox
            aria-label="User Menu"
            className="p-0 gap-2"
            selectedKeys={[pathname]}
            variant="flat"
          >
            {menuItems.map((item) => (
              <ListboxItem
                key={item.href}
                className={`${
                  pathname === item.href
                    ? "bg-danger/10 text-danger"
                    : "text-default-600"
                } h-12`}
                startContent={item.icon}
                onClick={() => onNavigate(item.href)}
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
          <header className="md:hidden sticky top-0 z-30 bg-white border-b border-divider mb-4">
            <div className="flex items-center justify-between py-3 px-1">
              <h2 className="font-black text-[#0B1C39]">Dashboard Member</h2>
              <Button
                isIconOnly
                color="danger"
                size="sm"
                variant="flat"
                onPress={() => setMobileMenuOpen(true)}
              >
                <Menu size={18} />
              </Button>
            </div>
          </header>

          <main className="animate-in fade-in duration-500">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
