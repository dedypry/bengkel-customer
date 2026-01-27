/* eslint-disable no-console */
import { useState } from "react";
import { Button, Input, Card, CardBody, Link } from "@heroui/react";
import { Phone, User, Car, ArrowLeft, UserPlus } from "lucide-react";

export default function MemberRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    carModel: "",
  });

  const handleRegister = (e: any) => {
    e.preventDefault();
    console.log("Data Registrasi:", formData);
    // Tambahkan logika pendaftaran di sini
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0B1C39]">
      {/* 1. Background Gradient Mesh */}
      <div className="absolute inset-0 z-0 bg-[#0B1C39] bg-[radial-gradient(circle_at_50%_50%,rgba(246,36,71,0.15),transparent_50%)]" />

      {/* 2. Floating Orbs (Animasi Bola Bergerak) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] right-[15%] w-72 h-72 bg-danger/20 rounded-full blur-[80px]"
          style={{ animation: "float 18s infinite ease-in-out" }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
          style={{ animation: "float 25s infinite ease-in-out reverse" }}
        />
      </div>

      {/* 3. Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Card className="w-full max-w-lg mx-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-none border-none z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white/95 backdrop-blur-sm">
        <CardBody className="p-8 md:p-12">
          {/* Header Register */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-danger p-3 mb-4 shadow-lg -rotate-3">
              <span className="text-white font-black text-2xl italic leading-none">
                HCP
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#0B1C39] uppercase tracking-tighter text-center">
              Daftar <span className="text-danger">Member Baru</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 text-center">
              Nikmati diskon khusus dan riwayat servis digital dengan bergabung
              menjadi member kami.
            </p>
          </div>

          {/* Form Register */}
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <Input
              classNames={{
                label:
                  "font-bold text-[#0B1C39] uppercase tracking-wider text-xs",
                inputWrapper:
                  "h-14 border-2 group-data-[focus=true]:border-danger bg-white",
              }}
              label="Nama Lengkap"
              labelPlacement="outside"
              placeholder="Masukkan nama sesuai STNK"
              radius="none"
              startContent={<User className="text-gray-400 mr-2" size={20} />}
              value={formData.fullName}
              variant="bordered"
              onValueChange={(v) => setFormData({ ...formData, fullName: v })}
            />

            <Input
              classNames={{
                label:
                  "font-bold text-[#0B1C39] uppercase tracking-wider text-xs",
                inputWrapper:
                  "h-14 border-2 group-data-[focus=true]:border-danger bg-white",
              }}
              label="Nomor WhatsApp"
              labelPlacement="outside"
              placeholder="0812xxxxxxx"
              radius="none"
              startContent={<Phone className="text-gray-400 mr-2" size={20} />}
              type="tel"
              value={formData.phone}
              variant="bordered"
              onValueChange={(v) => setFormData({ ...formData, phone: v })}
            />

            <Input
              classNames={{
                label:
                  "font-bold text-[#0B1C39] uppercase tracking-wider text-xs",
                inputWrapper:
                  "h-14 border-2 group-data-[focus=true]:border-danger bg-white",
              }}
              label="Tipe Mobil Honda"
              labelPlacement="outside"
              placeholder="Contoh: Civic RS 2023"
              radius="none"
              startContent={<Car className="text-gray-400 mr-2" size={20} />}
              value={formData.carModel}
              variant="bordered"
              onValueChange={(v) => setFormData({ ...formData, carModel: v })}
            />

            <div className="pt-2">
              <Button
                className="w-full bg-danger text-white font-black py-7 text-lg uppercase tracking-widest hover:bg-[#0B1C39] transition-all group"
                endContent={
                  <UserPlus className="group-hover:scale-110 transition-transform" />
                }
                radius="none"
                type="submit"
              >
                Daftar Member
              </Button>
            </div>
          </form>

          {/* Footer Register */}
          <div className="mt-8 flex flex-col gap-4 items-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              Sudah punya akun member?{" "}
              <Link
                className="text-danger font-bold hover:underline cursor-pointer"
                href="/login"
              >
                Login di sini
              </Link>
            </p>
            <Link
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-danger transition-colors cursor-pointer"
              href="/"
            >
              <ArrowLeft size={14} /> Kembali ke Beranda
            </Link>
          </div>
        </CardBody>
      </Card>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-30px) translateX(15px); }
          66% { transform: translateY(15px) translateX(-15px); }
        }
      `}</style>

      {/* Ornamen Industri */}
      <div className="absolute top-10 right-10 text-white/5 font-black text-8xl select-none pointer-events-none uppercase italic hidden lg:block">
        REG
      </div>
    </div>
  );
}
