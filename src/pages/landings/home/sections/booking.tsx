import {
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Building, Clock } from "lucide-react";

import CustomDatePicker from "@/components/forms/date-picker";
import { profile } from "@/configs/profile";
import {
  BookingFormValuesLanding,
  bookingSchemaLanding,
} from "@/pages/member/service/schema";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getBrand } from "@/stores/features/brand/brand-action";
import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

export function BookingSection() {
  const { brands } = useAppSelector((state) => state.brands);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  const { control, handleSubmit, reset } = useForm<BookingFormValuesLanding>({
    resolver: zodResolver(bookingSchemaLanding),
    mode: "onChange",
    defaultValues: {
      booking_time: "08:00",
      booking_date: dayjs().add(1, "day").toISOString(),
    },
  });

  function onSubmit(data: BookingFormValuesLanding) {
    setLoading(true);
    http
      .post("/bookings/landing", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
      })
      .catch((err) => notifyError(err))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section
      className="relative w-full min-h-[500px] flex flex-col md:flex-row overflow-hidden"
      id="booking"
    >
      {/* Sisi Kiri: Informasi (Background Image dengan Overlay) */}
      <div className="relative w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/pradana-3.jpg')`,
          }}
        >
          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-[#0B1C39]/85" />
        </div>

        {/* Konten Teks */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Penyedia Layanan Perbaikan Mobil Bersertifikat dan Terpercaya
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
            Kami menjamin setiap pengerjaan dilakukan sesuai standar operasional
            yang ketat. Gunakan formulir di samping untuk menjadwalkan kunjungan
            Anda tanpa harus mengantri lama di bengkel kami.
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Form Booking (Background Merah) */}
      <div className="w-full md:w-1/2 bg-danger p-12 lg:p-20 flex flex-col justify-center">
        <h3 className="text-white text-4xl font-black mb-8">Booking Layanan</h3>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="branch_id"
            render={({ field, fieldState }) => (
              <Select
                isInvalid={!!fieldState.error}
                label="Cabang"
                placeholder="Pilih Cabang Terdekat"
                selectedKeys={[field.value]}
                startContent={
                  <Building className="text-default-400" size={18} />
                }
                variant="flat"
                onSelectionChange={(key) => {
                  const val = Array.from(key)[0];

                  field.onChange(val);
                }}
              >
                {brands.map((v) => (
                  <SelectItem key={v.id} textValue={v.name}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={v.name}
                        className="shrink-0"
                        size="sm"
                        src={v.logo_url}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{v.name}</span>
                        <span className="text-tiny text-gray-400">
                          {v.address?.title || v.phone_number}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                label="Nama"
                placeholder="Nama Anda"
                variant="flat"
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                label="No. Whatsapp"
                placeholder="Nomor Whatsapp"
                variant="flat"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                label="Email"
                placeholder="Email Anda"
                variant="flat"
              />
            )}
          />
          <Controller
            control={control}
            name="service_type"
            render={({ field, fieldState }) => (
              <Select
                isInvalid={!!fieldState.error}
                label="Jenis Layanan"
                placeholder="Pilih Layanan"
                selectedKeys={[field.value]}
                variant="flat"
                onSelectionChange={(key) => {
                  const val = Array.from(key)[0];

                  field.onChange(val);
                }}
              >
                {profile.services.map((service) => (
                  <SelectItem key={service.name} textValue={service.name}>
                    {service.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="booking_date"
            render={({ field, fieldState }) => (
              <CustomDatePicker
                isInvalid={!!fieldState.error}
                label="Tanggal Kedatangan"
                minValue={today(getLocalTimeZone()).add({ days: 1 })}
                value={field.value as any}
                variant="flat"
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="booking_time"
            render={({ field, fieldState }) => (
              <Select
                isInvalid={!!fieldState.error}
                label="Jam"
                placeholder="Pilih Slot"
                selectedKeys={[field.value]}
                startContent={<Clock className="text-default-400" size={18} />}
                variant="flat"
              >
                {profile.times.map((time) => (
                  <SelectItem key={time} textValue={time}>
                    {time} WIB
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="vehicle_type"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                label="Jenis Kendaraan"
                placeholder="ex: Honda BRV"
                variant="flat"
              />
            )}
          />
          <Controller
            control={control}
            name="plate_number"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                isInvalid={!!fieldState.error}
                label="Plat No. Kendaraan"
                placeholder="ex: B1234HH"
                variant="flat"
              />
            )}
          />
          <Controller
            control={control}
            name="complaint"
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                className="col-span-1 sm:col-span-2"
                isInvalid={!!fieldState.error}
                label="Catatan Khusus / Permintaan"
                minRows={4}
                variant="flat"
              />
            )}
          />

          <Button
            className="col-span-1 sm:col-span-2 bg-[#0B1C39] text-white font-bold py-8 text-lg rounded-none mt-2 hover:bg-black transition-all"
            isLoading={isLoading}
            type="submit"
          >
            PESAN SEKARANG
          </Button>
        </form>
      </div>
    </section>
  );
}
