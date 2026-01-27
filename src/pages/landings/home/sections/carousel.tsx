/* eslint-disable react/jsx-no-comment-textnodes */
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/stores/hooks";

export default function CarouselSection() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-[calc(100vh-100px)] overflow-hidden"
      id="home"
    >
      {/* Background Image dengan Overlay Gelap */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/img/carousel-bg-1.jpg')`, // Ganti dengan path gambar bengkel Anda
        }}
      >
        <div className="absolute inset-0 bg-black/70" />{" "}
        {/* Overlay agar teks terbaca */}
      </div>

      {/* Konten Utama */}
      <div className="relative h-full container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Kolom Teks (Kiri) */}
        <div className="flex flex-col text-center lg:text-start items-center lg:items-start justify-center h-full gap-6 z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-danger font-bold text-xl">//</span>
            <p className="text-white font-bold tracking-widest uppercase text-sm md:text-base">
              Car Servicing
            </p>
            <span className="text-danger font-bold text-xl">//</span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">
            Qualified Car Repair <br />
            <span className="text-white">Service Center</span>
          </h1>

          <div className="mt-4">
            <Button
              className="rounded-none px-10 py-8 text-lg font-bold group"
              color="danger"
              endContent={
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              }
              size="lg"
              onPress={() => navigate(user ? "/dashboard" : "/login")}
            >
              {user ? "Dashboard" : "Join Member"}
            </Button>
          </div>
        </div>

        {/* Kolom Gambar Mobil (Kanan) */}
        <div className="hidden lg:block relative w-1/2 h-full">
          <img
            alt="Car Service"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            src="/img/carousel-1.png"
          />
        </div>
      </div>
    </section>
  );
}
