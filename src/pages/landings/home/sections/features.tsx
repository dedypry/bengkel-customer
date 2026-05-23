import { Settings, Users, Wrench } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Layanan Berkualitas",
      desc: "Setiap pekerjaan dicek ulang agar hasil servis rapi, aman, dan nyaman dipakai harian.",
      icon: <Settings className="text-danger" size={45} strokeWidth={2.5} />,
      active: false,
    },
    {
      title: "Teknisi Profesional",
      desc: "Dikerjakan tim berpengalaman yang paham kendaraan Jepang, Eropa, hingga mobil keluarga modern.",
      icon: <Users className="text-danger" size={45} strokeWidth={2.5} />,
      active: true,
    },
    {
      title: "Peralatan Modern",
      desc: "Diagnosa berbasis data untuk membantu Anda mengambil keputusan servis yang lebih tepat.",
      icon: <Wrench className="text-danger" size={45} strokeWidth={2.5} />,
      active: false,
    },
  ];

  return (
    <div className="relative z-20 -mt-16 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {features.map((f) => (
          <div
            key={f.title}
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

            <p className="text-xs uppercase tracking-widest font-bold text-danger mt-3">
              Siap untuk servis berkala maupun perbaikan menyeluruh
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
