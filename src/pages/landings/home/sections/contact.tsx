/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/iframe-has-title */
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { profile } from "@/configs/profile";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <MapPin className="text-danger" size={24} />,
      title: "Lokasi Bengkel",
      detail: profile.address,
    },
    {
      icon: <Phone className="text-danger" size={24} />,
      title: "Hubungi Kami",
      detail: profile.phone,
    },
    {
      icon: <Mail className="text-danger" size={24} />,
      title: "Email Support",
      detail: profile.email,
    },
    {
      icon: <Clock className="text-danger" size={24} />,
      title: "Jam Operasional",
      detail: "Senin - minggu: 08.30 - 17.00",
    },
  ];

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-danger font-bold tracking-[0.2em] uppercase mb-2">
            // HUBUNGI KAMI //
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1C39]">
            Ada Pertanyaan? Hubungi Kami Sekarang
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kolom Kiri: Info & Map */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-[#F2F2F2] p-6 flex flex-col gap-3 group hover:bg-[#0B1C39] transition-all duration-300"
                >
                  <div className="bg-white w-12 h-12 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h4 className="font-bold text-[#0B1C39] text-xl group-hover:text-white transition-colors">
                    {info.title}
                  </h4>
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors">
                    {info.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[415px] bg-gray-200 transition-all duration-500 overflow-hidden shadow-inner">
            <iframe
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=-6.4076505,106.751639&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
