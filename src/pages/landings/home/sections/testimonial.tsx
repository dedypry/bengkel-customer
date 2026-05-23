/* eslint-disable react/jsx-no-comment-textnodes */
import { User } from "@heroui/react";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Toyota Camry",
      text: "Saya suka karena semua dijelaskan dari awal. Estimasi biaya jelas, pengerjaan rapi, dan mobil terasa jauh lebih nyaman dipakai.",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      name: "Siska Putri",
      role: "Pemilik Honda CR-V",
      text: "Booking online-nya praktis banget. Datang sesuai jadwal, langsung ditangani, dan update progresnya juga komunikatif.",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      name: "Andi Wijaya",
      role: "Pemilik Mitsubishi Pajero",
      text: "Saya sudah beberapa kali servis di sini. Kualitas konsisten, teknisinya ramah, dan rekomendasinya selalu masuk akal.",
      image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-danger font-bold tracking-[0.2em] uppercase mb-2">
            // TESTIMONI //
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1C39]">
            Cerita Nyata dari Pelanggan Kami
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami, dari komunikasi
            awal hingga kendaraan kembali siap digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-10 flex flex-col gap-6 transition-all duration-300 hover:shadow-2xl ${
                i === 1 ? "bg-danger text-white" : "bg-white text-gray-600"
              }`}
            >
              <Quote
                className={i === 1 ? "text-white/50" : "text-danger/20"}
                fill="currentColor"
                size={40}
              />

              <p className="text-lg italic leading-relaxed">
                &quot;{t.text}&quot;
              </p>

              <div className="flex items-center gap-4 mt-4">
                <User
                  avatarProps={{
                    src: t.image,
                    size: "lg",
                    isBordered: true,
                    color: i === 1 ? "default" : "danger",
                  }}
                  classNames={{
                    name: `font-bold text-xl ${i === 1 ? "text-white" : "text-[#0B1C39]"}`,
                    description: `${i === 1 ? "text-white/80" : "text-gray-500"}`,
                  }}
                  description={t.role}
                  name={t.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
