import { Button, Input, Card, CardBody, Link } from "@heroui/react";
import { ArrowLeft, Lock, Mail, Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import { notify, notifyError } from "@/utils/helpers/notify";
import { http } from "@/utils/libs/axios";

const forgotSchema = z.object({
  email: z.string().min(1, "Email atau Nomor Telepon wajib diisi"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const handleForgot = (data: ForgotFormValues) => {
    setLoading(true);
    http
      .post("/auth/forgot-password", {
        ...data,
        type: "cs",
      })
      .then(() => {
        notify(
          "Instruksi reset password telah dikirim ke WhatsApp/Email Anda.",
        );
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0B1C39]">
      {/* Background & Orbs (Gunakan style yang sama dengan Login agar konsisten) */}
      <div className="absolute inset-0 z-0 bg-[#0B1C39] bg-[radial-gradient(circle_at_50%_50%,rgba(246,36,71,0.15),transparent_50%)]" />

      <Card className="w-full max-w-md mx-4 shadow-2xl rounded-none border-none z-10 bg-white/95">
        <CardBody className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#0B1C39] p-3 mb-4 rotate-3">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-[#0B1C39] uppercase tracking-tighter text-center">
              Reset <span className="text-danger">Password</span>
            </h1>
            <p className="text-gray-500 text-sm mt-4 text-center">
              Jangan khawatir! Masukkan Email atau Nomor Telepon Anda, kami akan
              mengirimkan instruksi untuk mengatur ulang password Anda.
            </p>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleForgot)}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  classNames={{
                    inputWrapper: `border-2 ${errors.email ? "border-danger" : ""}`,
                  }}
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  label="Email / No. Telepon"
                  labelPlacement="outside"
                  placeholder="Masukkan data terdaftar"
                  startContent={
                    <Mail className="text-gray-400 mr-2" size={20} />
                  }
                  variant="bordered"
                />
              )}
            />

            <Button
              className="bg-danger text-white font-black uppercase tracking-widest"
              endContent={<Send size={18} />}
              isLoading={loading}
              type="submit"
            >
              Kirim Instruksi
            </Button>
          </form>

          <div className="mt-8 flex justify-center border-t border-gray-100 pt-6">
            <Link
              className="flex items-center gap-2 text-xs font-bold text-[#0B1C39] hover:text-danger transition-colors"
              href="/login"
            >
              <ArrowLeft size={14} /> Kembali ke Login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
