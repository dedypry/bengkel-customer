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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/bg-carousel-1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative h-full container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col text-center lg:text-start items-center lg:items-start justify-center h-full gap-6 z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-danger font-bold text-xl">//</span>
            <p className="text-white font-bold tracking-widest uppercase text-sm md:text-base">
              Bengkel Modern & Transparan
            </p>
            <span className="text-danger font-bold text-xl">//</span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">
            Mobil Sehat,
            <br />
            <span className="text-white">Perjalanan Lebih Tenang</span>
          </h1>

          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl">
            Servis rutin, pengecekan menyeluruh, sampai perbaikan detail dalam
            satu tempat. Tim kami bantu jelaskan kondisi mobil dengan bahasa yang
            mudah dipahami, tanpa biaya tersembunyi.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm font-semibold">
            <span className="px-3 py-1 border border-white/40">
              Estimasi Jelas
            </span>
            <span className="px-3 py-1 border border-white/40">
              Teknisi Berpengalaman
            </span>
            <span className="px-3 py-1 border border-white/40">
              Booking Online Mudah
            </span>
          </div>

          <div className="mt-2">
            <Button
              className="rounded-none px-10 py-8 text-lg font-bold group"
              color="danger"
              endContent={
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              }
              size="lg"
              onPress={() => navigate(user ? "/dashboard" : "/login")}
            >
              {user ? "Buka Dashboard" : "Booking Sebagai Member"}
            </Button>
          </div>
        </div>

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
