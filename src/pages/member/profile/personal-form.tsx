import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, Input, Button, Textarea } from "@heroui/react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import Province from "@/components/regions/province";
import City from "@/components/regions/city";
import District from "@/components/regions/district";
import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import { getProfile } from "@/stores/features/auth/auth-action";

const profileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().min(5, "Alamat terlalu pendek"),
  province_id: z.any().optional(),
  city_id: z.any().optional(),
  district_id: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function PersonalForm() {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.profile?.phone_number || "",
      address: user?.profile?.address || "",
      province_id: user?.profile?.province_id,
      city_id: user?.profile?.city_id,
      district_id: user?.profile?.district_id,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    setLoading(true);
    http
      .patch("/customers/profile/update", data)
      .then(({ data }) => {
        notify(data.message);
        dispatch(getProfile());
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <Card className="mt-4 border-1 border-divider shadow-none">
      <CardBody className="p-8">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Nama Lengkap */}
          <Input
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            label="Nama Lengkap"
            labelPlacement="outside"
            placeholder="Masukkan nama lengkap"
            startContent={<User className="text-default-400" size={18} />}
            variant="bordered"
          />

          {/* Email */}
          <Input
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            label="Email"
            labelPlacement="outside"
            placeholder="email@contoh.com"
            startContent={<Mail className="text-default-400" size={18} />}
            variant="bordered"
          />

          {/* Nomor Telepon */}
          <Input
            {...register("phone")}
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
            label="Nomor Telepon"
            labelPlacement="outside"
            placeholder="0812..."
            startContent={<Phone className="text-default-400" size={18} />}
            variant="bordered"
          />

          <Controller
            control={control}
            name="province_id"
            render={({ field }) => (
              <Province setValue={field.onChange} value={field.value as any} />
            )}
          />
          <Controller
            control={control}
            name="city_id"
            render={({ field }) => (
              <City setValue={field.onChange} value={field.value as any} />
            )}
          />
          <Controller
            control={control}
            name="district_id"
            render={({ field }) => (
              <District setValue={field.onChange} value={field.value as any} />
            )}
          />

          {/* address */}
          <Textarea
            className="col-span-2"
            {...register("address")}
            errorMessage={errors.address?.message}
            isInvalid={!!errors.address}
            label="Alamat"
            labelPlacement="outside"
            placeholder="Masukkan address"
            startContent={<MapPin className="text-default-400" size={18} />}
            variant="bordered"
          />

          <div className="md:col-span-2 flex justify-end mt-4">
            <Button
              className="font-bold px-8"
              color="danger"
              isLoading={loading}
              startContent={!loading && <Save size={18} />}
              type="submit"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
