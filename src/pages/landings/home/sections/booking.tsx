import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";

export function BookingSection() {
  const services = [
    { label: "Uji Diagnostik", value: "diagnostic" },
    { label: "Servis Mesin", value: "engine" },
    { label: "Ganti Ban", value: "tires" },
    { label: "Ganti Oli", value: "oil" },
  ];

  return (
    <section
      className="relative w-full min-h-[500px] flex flex-col md:flex-row overflow-hidden"
      id="booking"
    >
      {/* Sisi Kiri: Informasi (Background Image dengan Overlay) */}
      <div className="relative w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://brazam.s3.ap-southeast-2.amazonaws.com/3ef7ff06-4cd5-44e7-8775-f5a1d8cf2ba3.webp')`,
          }}
        >
          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-[#0B1C39]/85" />
        </div>

        {/* Konten Teks */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Penyedia Layanan Perbaikan Mobil Bersertifikat dan Terpercaya
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
            Kami menjamin setiap pengerjaan dilakukan sesuai standar operasional
            yang ketat. Gunakan formulir di samping untuk menjadwalkan kunjungan
            Anda tanpa harus mengantri lama di bengkel kami.
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Form Booking (Background Merah) */}
      <div className="w-full md:w-1/2 bg-danger p-12 lg:p-20 flex flex-col justify-center">
        <h3 className="text-white text-4xl font-black mb-8">Booking Layanan</h3>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            className="bg-white"
            placeholder="Nama Anda"
            radius="none"
            type="text"
            variant="flat"
          />
          <Input
            className="bg-white"
            placeholder="Email Anda"
            radius="none"
            type="email"
            variant="flat"
          />

          <Select
            className="bg-white"
            placeholder="Pilih Layanan"
            radius="none"
            variant="flat"
          >
            {services.map((service) => (
              <SelectItem key={service.value} textValue={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            className="bg-white"
            defaultValue="2026-01-20"
            radius="none"
            type="date"
            variant="flat"
          />

          <Textarea
            className="col-span-1 sm:col-span-2 bg-white"
            minRows={4}
            placeholder="Catatan Khusus / Permintaan"
            radius="none"
            variant="flat"
          />

          <Button className="col-span-1 sm:col-span-2 bg-[#0B1C39] text-white font-bold py-8 text-lg rounded-none mt-2 hover:bg-black transition-all">
            PESAN SEKARANG
          </Button>
        </form>
      </div>
    </section>
  );
}
