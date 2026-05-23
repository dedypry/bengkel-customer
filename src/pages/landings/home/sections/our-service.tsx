import { Button } from "@heroui/react";
import {
  ArrowRight,
  CheckCircle2,
  Car,
  Settings,
  Wrench,
  Droplets,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { landingServices } from "../../services/data";

export function ServicesExplore() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(landingServices[0].id);
  const iconMap = {
    diag: <Car />,
    eng: <Settings />,
    tire: <Wrench />,
    oil: <Droplets />,
  };

  const serviceList = landingServices.map((service) => ({
    ...service,
    icon: iconMap[service.id as keyof typeof iconMap],
  }));

  const activeService = useMemo(
    () => serviceList.find((item) => item.id === activeId) || serviceList[0],
    [activeId],
  );

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
        <div className="lg:col-span-3 flex flex-col gap-2">
          {serviceList.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-6 cursor-pointer transition-all font-bold text-lg ${
                item.id === activeId
                  ? "bg-danger text-white"
                  : "bg-gray-100 text-[#0B1C39] hover:bg-gray-200"
              }`}
              onClick={() => setActiveId(item.id)}
            >
              {item.icon}
              {item.title}
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 h-[450px]">
          <img
            alt="Service Detail"
            className="w-full h-full object-cover shadow-xl"
            src={activeService.image}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 pl-0 lg:pl-6">
          <h3 className="text-3xl font-black text-[#0B1C39]">
            {activeService.heading}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {activeService.description}
          </p>

          <ul className="flex flex-col gap-4">
            {activeService.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 font-bold text-[#0B1C39]"
              >
                <CheckCircle2 className="text-success" size={24} />
                {point}
              </li>
            ))}
          </ul>

          <Button
            className="w-fit px-10 py-8 rounded-none font-bold text-lg mt-4 group"
            color="danger"
            endContent={
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            }
            onPress={() => navigate(`/layanan?service=${activeService.id}`)}
          >
            Pilih Layanan Ini
          </Button>
        </div>
      </div>
    </section>
  );
}
