import { Button, Image, Input, Link } from "@heroui/react";
import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  ChevronRight,
} from "lucide-react";

import { BackToTop } from "./back-to-top";

import { profile } from "@/configs/profile";

export default function Footer() {
  const socialLinks = [
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Facebook size={18} />, href: "#" },
    { icon: <Youtube size={18} />, href: "#" },
    { icon: <Linkedin size={18} />, href: "#" },
  ];

  return (
    <footer className="relative bg-[#0B1C39] text-white pt-20 pb-10 overflow-hidden">
      {/* Background Image Overlay (Sesuai Screenshot) */}
      <div
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/pradana-5.jpg')",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Alamat & Kontak */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold mb-2">Alamat Kami</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="text-white mt-1 shrink-0" size={20} />
                <p>{profile.address}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="text-white shrink-0" size={20} />
                <p>{profile.phone}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="text-white shrink-0" size={20} />
                <p>{profile.email}</p>
              </div>
            </div>
            {/* Social Media */}
            <div className="flex gap-2 mt-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-danger hover:border-danger transition-all duration-300"
                  href={social.href}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Jam Operasional</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-bold text-lg">Senin - Sabtu:</p>
                <p className="text-gray-300">08.30 - 17.00</p>
              </div>
              <div>
                <p className="font-bold text-lg">Minggu:</p>
                <p className="text-gray-300">09.00 - 16.00</p>
              </div>
            </div>
          </div>

          {/* Daftar Layanan */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Layanan Kami</h3>
            <div className="flex flex-col gap-3">
              {profile.services.map((service, index) => (
                <Link
                  key={index}
                  className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  href={service.href}
                >
                  <ChevronRight
                    className="text-gray-400 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dapatkan info promo servis dan tips perawatan mobil langsung di
              email Anda.
            </p>
            <div className="flex max-w-sm border-2 border-white bg-white p-1">
              <Input
                classNames={{
                  inputWrapper: "bg-white shadow-none h-12",
                  input: "text-black",
                }}
                placeholder="Email Anda"
                radius="none"
                type="email"
                variant="flat"
              />
              <Button
                className="bg-danger text-white font-bold h-12 px-6"
                radius="none"
              >
                SIGNUP
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-400">
            &copy; <span className="text-white font-bold">HCP</span>, All Right
            Reserved. Designed By{" "}
            <Link className="text-white underline ml-1" href="#">
              dedypry
            </Link>
          </p>

          <div className="flex gap-6 text-gray-400">
            <Link className="hover:text-white" href="#">
              Home
            </Link>
            <Link
              className="hover:text-white border-l border-gray-600 pl-6"
              href="#"
            >
              Cookies
            </Link>
            <Link
              className="hover:text-white border-l border-gray-600 pl-6"
              href="#"
            >
              Help
            </Link>
            <Link
              className="hover:text-white border-l border-gray-600 pl-6"
              href="#"
            >
              FQAs
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-7 z-50 right-22">
        <a
          href={`https://wa.me/${profile.phone}?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang...`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="WhatsApp Contact"
            className="cursor-pointer hover:scale-110 transition-transform"
            height={40}
            src="/wa.png"
            width={40}
          />
        </a>
      </div>
      <BackToTop />
    </footer>
  );
}
