/* eslint-disable react/jsx-no-comment-textnodes */
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

import { profile } from "@/configs/profile";

export function AboutSection() {
  const points = [
    {
      id: "01",
      title: "Profesional & Berpengalaman",
      desc: "Setiap mekanik kami memiliki sertifikasi resmi untuk menangani berbagai brand mobil.",
    },
    {
      id: "02",
      title: "Pusat Servis Berkualitas",
      desc: "Fasilitas bengkel lengkap dengan alat scan komputer presisi untuk diagnosa akurat.",
    },
    {
      id: "03",
      title: "Teknisi Pemenang Penghargaan",
      desc: "Tim kami terdiri dari teknisi ahli yang berdedikasi tinggi terhadap kepuasan pelanggan.",
    },
  ];

  return (
    <section className="py-20 px-6 container mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Sisi Kiri: Gambar dengan Badge Pengalaman */}
        <div className="relative group">
          <div className="overflow-hidden shadow-2xl">
            <img
              alt="Mekanik Ahli"
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              src="/pradana-1.jpg"
            />
          </div>
          {/* Badge Pengalaman */}
          <div className="absolute top-0 right-0 bg-danger/90 p-8 backdrop-blur-sm">
            <h2 className="text-white text-6xl font-black italic">15</h2>
            <p className="text-white font-bold text-xl uppercase leading-tight">
              Tahun <br /> Pengalaman
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Konten Teks */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-danger font-bold tracking-widest uppercase">
            <span>// TENTANG KAMI //</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1C39] leading-tight">
            <span className="text-danger">{profile.company}</span> Tempat
            Terbaik Untuk Perawatan Mobil Anda
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Kami hadir memberikan solusi perawatan kendaraan yang transparan dan
            terpercaya. Mulai dari ganti oli rutin hingga perbaikan mesin berat,
            kami menggunakan suku cadang asli dan peralatan modern untuk
            memastikan performa mobil Anda tetap prima.
          </p>

          {/* List Poin 01, 02, 03 */}
          <div className="flex flex-col gap-6 my-4">
            {points.map((p) => (
              <div key={p.id} className="flex gap-5 items-start group">
                <div className="bg-gray-100 p-4 text-[#0B1C39] font-black text-xl group-hover:bg-danger group-hover:text-white transition-all duration-300">
                  {p.id}
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1C39] text-xl mb-1">
                    {p.title}
                  </h4>
                  <p className="text-gray-500 max-w-md">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-fit px-10 py-8 rounded-none font-bold text-lg group bg-danger hover:bg-[#0B1C39] transition-colors duration-300"
            color="danger"
            endContent={
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            }
          >
            SELENGKAPNYA
          </Button>
        </div>
      </div>
    </section>
  );
}
