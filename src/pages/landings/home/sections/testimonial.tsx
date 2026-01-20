/* eslint-disable react/jsx-no-comment-textnodes */
import { User } from "@heroui/react";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Toyota Camry",
      text: "Pelayanan sangat cepat dan transparan. Mekanik menjelaskan detail kerusakan dengan jelas sebelum mulai bekerja. Sangat puas dengan hasilnya!",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      name: "Siska Putri",
      role: "Pemilik Honda CR-V",
      text: "Bengkel paling terpercaya di kota ini. Ruang tunggu nyaman, dan mobil saya terasa seperti baru kembali setelah servis besar di sini.",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      name: "Andi Wijaya",
      role: "Pemilik Mitsubishi Pajero",
      text: "Sistem booking online-nya sangat membantu. Tidak perlu antre lama, datang langsung dikerjakan. Harga juga sangat kompetitif.",
      image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-danger font-bold tracking-[0.2em] uppercase mb-2">
            // TESTIMONI //
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1C39]">
            Apa Kata Pelanggan Kami!
          </h2>
        </div>

        {/* Testimonial Cards */}
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
