import { Button, Input, Card, CardBody } from "@heroui/react";
import { Lock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

// 1. Skema Validasi: Password baru harus cocok dengan konfirmasi
const resetSchema = z
  .object({
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Mengambil ?token=abc dari URL

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleReset = (data: ResetFormValues) => {
    if (!token) {
      notifyError("Token tidak valid atau sudah kedaluwarsa.");

      return;
    }

    setLoading(true);
    http
      .post("/auth/reset-password", { token, password: data.password })
      .then(() => {
        notify("Password berhasil diperbarui!");
        setIsSuccess(true);
        // Otomatis pindah ke login setelah 3 detik
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0B1C39]">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(246,36,71,0.15),transparent_50%)]" />

      <Card className="w-full max-w-md mx-4 shadow-2xl rounded-none border-none z-10 bg-white/95 backdrop-blur-sm">
        <CardBody className="p-8 md:p-12">
          {!isSuccess ? (
            <>
              <div className="flex flex-col items-center mb-8">
                <div className="bg-danger p-3 mb-4 shadow-lg -rotate-3">
                  <ShieldCheck className="text-white" size={28} />
                </div>
                <h1 className="text-2xl font-black text-[#0B1C39] uppercase tracking-tighter text-center">
                  Buat <span className="text-danger">Password Baru</span>
                </h1>
                <p className="text-gray-500 text-sm mt-2 text-center">
                  Amankan kembali akun Anda. Silakan masukkan kata sandi baru
                  yang sulit ditebak.
                </p>
              </div>

              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(handleReset)}
              >
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      classNames={{
                        inputWrapper: `border-2 ${errors.password ? "border-danger" : ""}`,
                      }}
                      errorMessage={errors.password?.message}
                      isInvalid={!!errors.password}
                      label="Password Baru"
                      labelPlacement="outside"
                      placeholder="••••••••"
                      startContent={
                        <Lock className="text-gray-400 mr-2" size={20} />
                      }
                      type="password"
                      variant="bordered"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <Input
                      {...field}
                      classNames={{
                        inputWrapper: `border-2 ${errors.confirmPassword ? "border-danger" : ""}`,
                      }}
                      errorMessage={errors.confirmPassword?.message}
                      isInvalid={!!errors.confirmPassword}
                      label="Konfirmasi Password Baru"
                      labelPlacement="outside"
                      placeholder="••••••••"
                      startContent={
                        <Lock className="text-gray-400 mr-2" size={20} />
                      }
                      type="password"
                      variant="bordered"
                    />
                  )}
                />

                <Button
                  className="bg-danger text-white font-black uppercase tracking-widest hover:bg-[#0B1C39] transition-all group"
                  endContent={
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  }
                  isLoading={loading}
                  type="submit"
                >
                  Simpan Password Baru
                </Button>
              </form>
            </>
          ) : (
            /* Tampilan Sukses */
            <div className="flex flex-col items-center py-10 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-black text-[#0B1C39] mb-2">
                BERHASIL!
              </h2>
              <p className="text-gray-500 mb-8">
                Password Anda telah diperbarui. Anda akan diarahkan ke halaman
                login dalam beberapa detik...
              </p>
              <Button
                color="danger"
                variant="flat"
                onPress={() => navigate("/login")}
              >
                Masuk Sekarang
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
