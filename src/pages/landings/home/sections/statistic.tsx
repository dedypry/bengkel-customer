/* eslint-disable react/jsx-no-comment-textnodes */
import { Check, Users, UserCheck, Car } from "lucide-react";

export function StatisticsSection() {
  const stats = [
    {
      id: 1,
      label: "Tahun Pengalaman",
      value: "15+",
      icon: <Check size={32} />,
    },
    { id: 2, label: "Teknisi Ahli", value: "25+", icon: <Users size={32} /> },
    {
      id: 3,
      label: "Pelanggan Puas",
      value: "1.200+",
      icon: <UserCheck size={32} />,
    },
    {
      id: 4,
      label: "Unit Ditangani",
      value: "2.000+",
      icon: <Car size={32} />,
    },
  ];

  return (
    <section className="relative py-20">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('/pradana-2.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-[#0B1C39]/80" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="text-center mb-12 text-white max-w-2xl mx-auto">
          <p className="font-bold tracking-[0.2em] uppercase text-danger mb-2">
            // Rekam Jejak Kami //
          </p>
          <h3 className="text-3xl md:text-4xl font-black leading-tight">
            Dipercaya Banyak Pelanggan untuk Servis Harian Hingga Perbaikan
            Besar
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div
              key={s.id}
              className="text-white flex flex-col items-center gap-3"
            >
              <div className="mb-2">{s.icon}</div>
              <h2 className="text-5xl font-black">{s.value}</h2>
              <p className="font-bold text-lg uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
