import { Button } from "@heroui/react";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white px-4">
      {/* Ikon/Ilustrasi */}
      <div className="relative mb-8">
        <h1 className="text-[150px] md:text-[200px] font-black text-default-100 leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Ghost className="text-danger animate-bounce" size={80} />
        </div>
      </div>

      {/* Teks Informasi */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C39]">
          Ups! Halaman Tidak Ditemukan
        </h2>
        <p className="text-default-500 max-w-md mx-auto">
          Sepertinya mesin kamu mogok di tengah jalan yang salah. Halaman yang
          kamu cari tidak ada atau telah dipindahkan.
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="font-bold uppercase tracking-wider"
          color="danger"
          startContent={<ArrowLeft size={18} />}
          variant="bordered"
          onPress={() => navigate(-1)}
        >
          Kembali
        </Button>
        <Button
          className="font-bold uppercase tracking-wider shadow-lg shadow-danger/30"
          color="danger"
          startContent={<Home size={18} />}
          onPress={() => navigate("/customer")}
        >
          Ke Dashboard
        </Button>
      </div>

      {/* Footer Dekoratif */}
      <div className="fixed bottom-8 text-default-300 text-xs uppercase tracking-widest font-bold">
        Bengkel 90 • System Error
      </div>
    </div>
  );
}
