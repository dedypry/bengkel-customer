import { Button, Input, Card, CardBody, Link } from "@heroui/react";
import { ArrowLeft, ArrowRight, Lock, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import { http } from "@/utils/libs/axios";
import { notifyError } from "@/utils/helpers/notify";
import GuestGuard from "@/guard/guest-guard";

const loginSchema = z.object({
  email: z.string().min(1, "Nomor telepon atau email wajib diisi"),
  password: z.string().min(3, "Password minimal 3 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function MemberLogin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    setLoading(true);
    http
      .post("/auth/login/customer", data)
      .then(({ data }) => {
        console.log("DATA", data);
        Cookies.set("token", data.access_token, {
          expires: 1,
          path: "/",
          sameSite: "strict",
        });
        navigate("/dashboard");
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <GuestGuard>
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0B1C39]">
        {/* 1. Background Gradient Mesh */}
        <div className="absolute inset-0 z-0 bg-[#0B1C39] bg-[radial-gradient(circle_at_50%_50%,rgba(246,36,71,0.15),transparent_50%)]" />

        {/* 2. Bola-bola Animasi (Floating Orbs) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Bola 1 */}
          <div
            className="absolute top-[10%] left-[15%] w-64 h-64 bg-danger/20 rounded-full blur-[80px] animate-pulse"
            style={{ animation: "float 15s infinite ease-in-out" }}
          />
          {/* Bola 2 */}
          <div
            className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
            style={{ animation: "float 20s infinite ease-in-out reverse" }}
          />
          {/* Bola 3 */}
          <div
            className="absolute top-[50%] right-[40%] w-48 h-48 bg-white/5 rounded-full blur-[60px]"
            style={{ animation: "float 12s infinite linear" }}
          />
        </div>

        {/* 3. Texture Overlay (Opsi: Noise atau Pattern) */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <Card className="w-full max-w-md mx-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-none border-none z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white/95 backdrop-blur-sm">
          <CardBody className="p-8 md:p-12">
            {/* Header Login */}
            <div className="flex flex-col items-center mb-10">
              <div className="bg-danger p-3 mb-4 shadow-lg rotate-3">
                <span className="text-white font-black text-2xl italic leading-none">
                  HCP
                </span>
              </div>
              <h1 className="text-2xl font-black text-[#0B1C39] uppercase tracking-tighter text-center">
                Member <span className="text-danger">Login</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2 text-center">
                Masukkan nomor telepon Anda yang terdaftar sebagai member
                PRADANA AUTO CARE.
              </p>
            </div>

            {/* Form Login */}
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="relative">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      classNames={{
                        label:
                          "font-bold text-[#0B1C39] uppercase tracking-wider text-xs",
                        inputWrapper: `border-2 bg-white ${
                          errors.email
                            ? "border-danger"
                            : "group-data-[focus=true]:border-danger"
                        }`,
                      }}
                      errorMessage={errors.email?.message}
                      isInvalid={!!errors.email}
                      label="Nomor Telepon/Email"
                      labelPlacement="outside"
                      placeholder="Masukan Email/ No. Telp"
                      startContent={
                        <User className="text-gray-400 mr-2" size={20} />
                      }
                      variant="bordered"
                    />
                  )}
                />
              </div>
              <div className="relative">
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      classNames={{
                        label:
                          "font-bold text-[#0B1C39] uppercase tracking-wider text-xs",
                        inputWrapper: `border-2 bg-white ${
                          errors.password
                            ? "border-danger"
                            : "group-data-[focus=true]:border-danger"
                        }`,
                      }}
                      errorMessage={errors.password?.message}
                      isInvalid={!!errors.password}
                      label="Password"
                      labelPlacement="outside"
                      placeholder="*****"
                      startContent={
                        <Lock className="text-gray-400 mr-2" size={20} />
                      }
                      type="password"
                      variant="bordered"
                    />
                  )}
                />

                <div className="flex justify-end mt-1">
                  <Link
                    className="text-xs font-bold text-gray-500 hover:text-danger transition-colors"
                    href="/forgot-password"
                  >
                    Lupa Password?
                  </Link>
                </div>
              </div>

              <Button
                className="bg-danger text-white font-black uppercase tracking-widest hover:bg-[#0B1C39] transition-all group"
                endContent={
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                }
                isLoading={loading}
                type="submit"
              >
                Masuk Sekarang
              </Button>
            </form>

            {/* Footer Login */}
            <div className="mt-10 flex flex-col gap-4 items-center border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-600">
                Masuk menggunakan wa code?{" "}
                <Link
                  className="text-danger font-bold hover:underline cursor-pointer"
                  href="/login/phone"
                >
                  Masuk Sekarang
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

        {/* CSS Animasi (Tambahkan ke globals.css jika ingin lebih rapi) */}
        <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>

        {/* Ornamen Industri Bawah */}
        <div className="absolute bottom-4 right-4 text-white/5 font-black text-6xl select-none pointer-events-none uppercase italic">
          PRADANA AUTO CARE
        </div>
      </div>
    </GuestGuard>
  );
}
