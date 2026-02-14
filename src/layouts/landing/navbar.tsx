/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import {
  Clock,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppSelector } from "@/stores/hooks";
import { profile } from "@/configs/profile";

export default function NavbarCustom() {
  const [activeSection, setActiveSection] = useState("home");
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const isDashboard =
    pathname.startsWith("/customer") || pathname.startsWith("/dashboard");

  const navigate = useNavigate();

  const handleScroll = (e: any, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const offset = 80; // Sesuaikan dengan tinggi navbar Anda
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Logika Intersection Observer untuk mendeteksi section saat scroll
  useEffect(() => {
    const sections = ["home", "about", "service", "booking", "contact"];

    const observerOptions = {
      root: null,
      // Gunakan rootMargin yang lebih fleksibel
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.25, 0.5], // Deteksi di berbagai tingkatan visibilitas
    };

    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        // Prioritaskan section yang paling banyak terlihat di layar
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });

      // LOGIKA KHUSUS UNTUK SECTION TERAKHIR (CONTACT)
      // Jika user sudah scroll sampai mentok bawah, paksa aktifkan 'contact'
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const bodyHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= bodyHeight - 50) {
        setActiveSection("contact");
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (element) observer.observe(element);
    });

    // Tambahkan event listener scroll tambahan untuk menangani batas bawah halaman
    const handleExtraScroll = () => {
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const bodyHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= bodyHeight - 100) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleExtraScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleExtraScroll);
    };
  }, []);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Tentang Kami", id: "about" },
    { name: "Layanan", id: "service" },
    { name: "Booking", id: "booking" },
    { name: "Kontak", id: "contact" },
  ];

  return (
    <>
      {/* Top Bar - Informasi Kontak & Sosmed */}
      <div className="w-full bg-[#F2F2F2] px-6 lg:px-12 py-3 hidden md:flex justify-between items-center border-b border-gray-200">
        <div className="flex gap-8">
          <div className="flex gap-2 items-center">
            <MapPin className="text-danger" size={16} />
            <p className="text-sm font-medium text-gray-600">
              {profile.short_address}
            </p>
          </div>
          <div className="flex gap-2 items-center border-l border-gray-300 pl-8">
            <Clock className="text-danger" size={16} />
            <p className="text-sm font-medium text-gray-600">
              Senin - Minggu : 08.30 - 17.00
            </p>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-2 items-center mr-4">
            <Phone className="text-danger" size={16} />
            <p className="text-sm font-bold text-[#0B1C39]">{profile.phone}</p>
          </div>
          <div className="flex gap-3">
            <Link className="text-gray-500 hover:text-danger" href="#">
              <Facebook size={16} />
            </Link>
            <Link className="text-gray-500 hover:text-danger" href="#">
              <Instagram size={16} />
            </Link>
            <Link className="text-gray-500 hover:text-danger" href="#">
              <Twitter size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        className="bg-white shadow-sm"
        classNames={{
          wrapper: "max-w-full px-6 lg:px-12",
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[3px]",
            "data-[active=true]:after:bg-danger",
          ],
        }}
        maxWidth="full"
        position="sticky"
      >
        <NavbarBrand>
          <Link className="flex items-center gap-2 cursor-pointer" href="/">
            <div className="bg-danger p-1.5 rounded-sm">
              <span className="text-white font-black text-xl italic leading-none">
                PAC
              </span>
            </div>
            <p className="font-black text-2xl text-[#0B1C39] tracking-tighter uppercase">
              Pradana <span className="text-danger">Auto</span> Care
            </p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex gap-8" justify="center">
          {!isDashboard &&
            menuItems.map((item) => (
              <NavbarItem key={item.id} isActive={activeSection === item.id}>
                <Link
                  className={`font-bold text-sm uppercase tracking-wider transition-colors ${
                    activeSection === item.id
                      ? "text-danger"
                      : "text-[#0B1C39] hover:text-danger"
                  }`}
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            ))}
        </NavbarContent>

        <NavbarContent className="lg:min-w-[200px]" justify="end">
          {/* Tombol Join Member dengan gaya industri sesuai screenshot */}
          <div className="hidden md:flex h-full items-center">
            <div
              className="bg-danger h-full flex items-center px-10 absolute right-0 cursor-pointer hover:bg-[#0B1C39] transition-colors group"
              onClick={() => navigate(user ? "/dashboard" : "/login")}
            >
              <p className="font-black text-lg text-white uppercase tracking-widest flex items-center gap-2">
                {user ? "Dashboard" : "Join Member"}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </p>
            </div>
          </div>
        </NavbarContent>
      </Navbar>
    </>
  );
}
