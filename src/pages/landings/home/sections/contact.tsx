/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Input, Textarea } from "@heroui/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <MapPin className="text-danger" size={24} />,
      title: "Lokasi Bengkel",
      detail: "Jl. Industri Raya No. 123, Jakarta Pusat, Indonesia",
    },
    {
      icon: <Phone className="text-danger" size={24} />,
      title: "Hubungi Kami",
      detail: "+62 21 345 6789 / +62 812 3456 7890",
    },
    {
      icon: <Mail className="text-danger" size={24} />,
      title: "Email Support",
      detail: "info@hondaclinikpradana.com",
    },
    {
      icon: <Clock className="text-danger" size={24} />,
      title: "Jam Operasional",
      detail: "Senin - Sabtu: 09.00 - 17.00 (Minggu Tutup)",
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

            {/* Google Maps Placeholder */}
            <div className="w-full h-[300px] bg-gray-200 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden shadow-inner">
              <iframe
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126935.21045233177!2d106.74603099039396!3d-6.168725899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764826d%3A0x36166cb31b038a82!2sJakarta%20Pusat%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1705741000000!5m2!1sid!2sid"
              />
            </div>
          </div>

          {/* Kolom Kanan: Form Kontak */}
          <div className="bg-[#0B1C39] p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">Kirim Pesan</h3>
            <p className="text-gray-400 mb-8 italic">
              Butuh konsultasi harga atau cek ketersediaan suku cadang? Silakan
              isi formulir di bawah ini.
            </p>

            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  className="bg-white"
                  placeholder="Nama Lengkap"
                  radius="none"
                  variant="flat"
                />
                <Input
                  className="bg-white"
                  placeholder="Nomor WhatsApp"
                  radius="none"
                  variant="flat"
                />
              </div>
              <Input
                className="bg-white"
                placeholder="Subjek (Contoh: Tanya Ganti Oli)"
                radius="none"
                variant="flat"
              />
              <Textarea
                className="bg-white"
                minRows={5}
                placeholder="Tulis pesan Anda di sini..."
                radius="none"
                variant="flat"
              />
              <Button
                className="bg-danger text-white font-bold py-8 text-lg group hover:bg-white hover:text-danger transition-all duration-300"
                endContent={
                  <Send
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    size={20}
                  />
                }
                radius="none"
              >
                KIRIM PESAN SEKARANG
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
