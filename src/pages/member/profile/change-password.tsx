import { Card, CardBody, Divider, Button } from "@heroui/react";
import { ShieldCheck } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import InputPassword from "@/components/forms/input-password";
import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"], // Error akan muncul di field confirmPassword
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordValues) => {
    setLoading(true);
    console.log("Data dikirim:", data);

    http
      .patch("/customers/profile/change-password", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <Card className="mt-4 border-1 border-divider shadow-none">
      <CardBody className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-warning/10 text-warning rounded-lg">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#0B1C39]">Ganti Password</h4>
            <p className="text-xs text-default-500">
              Pastikan password baru Anda kuat dan unik.
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-6 max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Password Saat Ini */}
          <InputPassword
            {...register("currentPassword")}
            errorMessage={errors.currentPassword?.message}
            isInvalid={!!errors.currentPassword}
            label="Password Saat Ini"
            placeholder="Masukan Password Saat Ini"
          />

          <Divider />

          {/* Password Baru */}
          <InputPassword
            {...register("newPassword")}
            errorMessage={errors.newPassword?.message}
            isInvalid={!!errors.newPassword}
            label="Password Baru"
            placeholder="Masukan Password Baru"
          />

          {/* Konfirmasi Password Baru */}
          <InputPassword
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
            label="Konfirmasi Password Baru"
            placeholder="Masukan Konfirmasi Password Baru"
          />

          <div className="flex justify-start mt-2">
            <Button
              className="font-bold px-8"
              color="danger"
              isLoading={loading}
              type="submit"
            >
              Perbarui Password
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
