/* eslint-disable react/jsx-no-comment-textnodes */
import { Button, Card, CardBody, Chip } from "@heroui/react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { landingServices } from "./data";

import { useAppSelector } from "@/stores/hooks";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const serviceId = searchParams.get("service");

  const selectedService = useMemo(
    () =>
      landingServices.find((item) => item.id === serviceId) ||
      landingServices[0],
    [serviceId],
  );

  return (
    <section className="container mx-auto px-6 py-14 md:py-20">
      <div className="max-w-3xl">
        <p className="text-danger font-bold tracking-[0.2em] uppercase mb-2">
          // Detail Layanan //
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[#0B1C39] leading-tight">
          {selectedService.heading}
        </h1>
        <p className="text-gray-600 mt-5 text-lg leading-relaxed">
          {selectedService.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        <div className="lg:col-span-7">
          <img
            alt={selectedService.title}
            className="w-full h-[430px] object-cover shadow-xl"
            src={selectedService.image}
          />
        </div>

        <Card className="lg:col-span-5 border border-divider shadow-sm">
          <CardBody className="p-6 space-y-6">
            <div>
              <Chip color="danger" size="sm" variant="flat">
                {selectedService.title}
              </Chip>
              <h2 className="text-2xl font-black text-[#0B1C39] mt-3">
                Kenapa layanan ini penting?
              </h2>
            </div>

            <ul className="space-y-3">
              {selectedService.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[#0B1C39]"
                >
                  <CheckCircle2 className="text-success mt-0.5" size={18} />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-divider p-4">
                <Clock3 className="text-danger mb-2" size={18} />
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Estimasi
                </p>
                <p className="font-bold text-[#0B1C39]">
                  Sesuai hasil diagnosa
                </p>
              </div>
              <div className="border border-divider p-4">
                <ShieldCheck className="text-danger mb-2" size={18} />
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Standar
                </p>
                <p className="font-bold text-[#0B1C39]">
                  Pengerjaan transparan
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {landingServices.map((service) => (
          <Card
            key={service.id}
            isPressable
            className={`border transition-all ${
              service.id === selectedService.id
                ? "border-danger bg-danger/5"
                : "border-divider hover:border-danger/50"
            }`}
            onPress={() => navigate(`/layanan?service=${service.id}`)}
          >
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-[#0B1C39]">{service.title}</h3>
                <Wrench className="text-danger" size={16} />
              </div>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {service.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-[#0B1C39] text-white p-8 md:p-10">
        <h3 className="text-2xl font-black">
          Siap Booking untuk {selectedService.title}?
        </h3>
        <p className="text-white/80 mt-2 max-w-2xl">
          Pilih jadwal yang sesuai, tim kami akan bantu siapkan kunjungan agar
          proses servis lebih cepat dan nyaman.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            className="font-bold"
            color="danger"
            endContent={<ArrowRight size={16} />}
            onPress={() => navigate(user ? "/customer/service" : "/login")}
          >
            {user ? "Booking dari Dashboard" : "Masuk untuk Booking"}
          </Button>
          <Button
            className="font-bold text-white"
            variant="bordered"
            onPress={() => navigate("/#booking")}
          >
            Booking Cepat dari Landing
          </Button>
        </div>
      </div>
    </section>
  );
}
