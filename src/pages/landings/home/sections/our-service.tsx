/* eslint-disable react/jsx-no-comment-textnodes */
import { Button } from "@heroui/react";
import {
  ArrowRight,
  CheckCircle2,
  Car,
  Settings,
  Wrench,
  Droplets,
} from "lucide-react";

export function ServicesExplore() {
  const serviceList = [
    { id: "diag", title: "Diagnostic Test", icon: <Car />, active: true },
    { id: "eng", title: "Engine Servicing", icon: <Settings />, active: false },
    { id: "tire", title: "Tires Replacement", icon: <Wrench />, active: false },
    { id: "oil", title: "Oil Changing", icon: <Droplets />, active: false },
  ];

  return (
    <section className="py-24 container mx-auto px-6" id="service">
      <div className="text-center mb-16">
        <p className="text-danger font-bold tracking-[0.2em] uppercase mb-2">
          // Layanan Kami //
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-[#0B1C39]">
          Jelajahi Layanan Kami
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Vertical Tabs */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {serviceList.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-6 cursor-pointer transition-all font-bold text-lg ${
                item.active
                  ? "bg-danger text-white"
                  : "bg-gray-100 text-[#0B1C39] hover:bg-gray-200"
              }`}
            >
              {item.icon}
              {item.title}
            </div>
          ))}
        </div>

        {/* Kolom Tengah: Gambar */}
        <div className="lg:col-span-5 h-[450px]">
          <img
            alt="Service Detail"
            className="w-full h-full object-cover shadow-xl"
            src="/img/service-1.jpg"
          />
        </div>

        {/* Kolom Kanan: Deskripsi Detail */}
        <div className="lg:col-span-4 flex flex-col gap-6 pl-0 lg:pl-6">
          <h3 className="text-3xl font-black text-[#0B1C39]">
            15 Tahun Pengalaman Dalam Servis Otomotif
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Kami menyediakan layanan diagnosa menyeluruh menggunakan alat
            pemindai terbaru untuk memastikan setiap sensor dan komponen
            elektronik mobil Anda bekerja sempurna.
          </p>

          <ul className="flex flex-col gap-4">
            {["Layanan Berkualitas", "Teknisi Ahli", "Peralatan Modern"].map(
              (point, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 font-bold text-[#0B1C39]"
                >
                  <CheckCircle2 className="text-success" size={24} />
                  {point}
                </li>
              ),
            )}
          </ul>

          <Button
            className="w-fit px-10 py-8 rounded-none font-bold text-lg mt-4 group"
            color="danger"
            endContent={
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            }
          >
            BACA SELENGKAPNYA
          </Button>
        </div>
      </div>
    </section>
  );
}
