/* eslint-disable jsx-a11y/anchor-is-valid */
import { Settings, Users, Wrench } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Layanan Berkualitas",
      desc: "Teknisi ahli kami memastikan kendaraan Anda mendapatkan perawatan terbaik dengan standar OEM.",
      icon: <Settings className="text-danger" size={45} strokeWidth={2.5} />,
      active: false,
    },
    {
      title: "Teknisi Profesional",
      desc: "Tim mekanik bersertifikat dengan pengalaman lebih dari 10 tahun di berbagai jenis mesin.",
      icon: <Users className="text-danger" size={45} strokeWidth={2.5} />,
      active: true, // Warna abu-abu di tengah
    },
    {
      title: "Peralatan Modern",
      desc: "Menggunakan pemindai diagnostik terbaru untuk mendeteksi masalah mobil secara akurat.",
      icon: <Wrench className="text-danger" size={45} strokeWidth={2.5} />,
      active: false,
    },
  ];

  return (
    <div className="relative z-20 -mt-16 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-10 flex flex-col shadow-xl items-start gap-4 transition-all duration-300 hover:transform hover:-translate-y-1 ${
              f.active ? "bg-[#F2F2F2]" : "bg-white"
            }`}
          >
            {/* Icon Container */}
            <div className="mb-2">{f.icon}</div>

            <h3 className="text-2xl font-extrabold text-[#0B1C39] tracking-tight">
              {f.title}
            </h3>

            <p className="text-gray-600 leading-relaxed font-medium">
              {f.desc}
            </p>

            <a
              className="group flex items-center gap-2 text-[#0B1C39] font-black text-sm uppercase mt-4 tracking-wider hover:text-danger transition-colors"
              href="#"
            >
              SELENGKAPNYA
              <span className="text-danger group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
