import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Textarea,
  Divider,
  Avatar,
} from "@heroui/react";
import { CalendarDays, Clock, CarFront, Building } from "lucide-react";
import { getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { BookingFormValues, bookingSchema } from "./schema";

import CustomDatePicker from "@/components/forms/date-picker";
import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import { getBrand } from "@/stores/features/brand/brand-action";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { profile } from "@/configs/profile";

interface BookingModalProps {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

export default function BookingModal({ isOpen, setOpen }: BookingModalProps) {
  const { user } = useAppSelector((state) => state.auth);
  const { brands } = useAppSelector((state) => state.brands);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      booking_time: "08:00",
      booking_date: dayjs().add(1, "day").toISOString(),
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setLoading(true);
    http
      .post("/bookings", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
        setOpen(false);
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="outside"
        size="2xl"
        onOpenChange={setOpen}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-danger/10 text-danger rounded-lg">
                    <CalendarDays size={20} />
                  </div>
                  <span>Buat Janji Temu Servis</span>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="space-y-6 py-2">
                  {/* Pilih Kendaraan */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name="vehicle_id"
                      render={({ field }) => (
                        <Select
                          errorMessage={errors.vehicle_id?.message}
                          isInvalid={!!errors.vehicle_id}
                          label="Kendaraan"
                          labelPlacement="outside"
                          placeholder="Pilih kendaraan Anda"
                          selectedKeys={[field.value]}
                          startContent={
                            <CarFront className="text-default-400" size={18} />
                          }
                          variant="bordered"
                          onSelectionChange={(key) => {
                            const val = Array.from(key)[0];

                            field.onChange(val);
                          }}
                        >
                          {(user?.vehicles || []).map((v) => (
                            <SelectItem key={v.id} textValue={v.plate_number}>
                              {v.brand} {v.model} ({v.plate_number})
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      control={control}
                      name="branch_id"
                      render={({ field }) => (
                        <Select
                          errorMessage={errors.branch_id?.message}
                          isInvalid={!!errors.branch_id}
                          label="Cabang"
                          labelPlacement="outside"
                          placeholder="Pilih Cabang Terdekat"
                          selectedKeys={[field.value]}
                          startContent={
                            <Building className="text-default-400" size={18} />
                          }
                          variant="bordered"
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
                      name="booking_date"
                      render={({ field }) => (
                        <CustomDatePicker
                          errorMessage={errors.booking_date?.message}
                          isInvalid={!!errors.booking_date}
                          label="Tanggal Kedatangan"
                          labelPlacement="outside"
                          minValue={today(getLocalTimeZone()).add({ days: 1 })}
                          value={field.value as any}
                          variant="bordered"
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="booking_time"
                      render={({ field, fieldState }) => (
                        <Select
                          errorMessage={fieldState.error?.message}
                          isInvalid={!!fieldState.error}
                          label="Jam"
                          labelPlacement="outside"
                          placeholder="Pilih Slot"
                          selectedKeys={[field.value]}
                          startContent={
                            <Clock className="text-default-400" size={18} />
                          }
                          variant="bordered"
                        >
                          {profile.times.map((time) => (
                            <SelectItem key={time} textValue={time}>
                              {time} WIB
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>

                  <Divider className="mb-10" />

                  <Controller
                    control={control}
                    name="service_type"
                    render={({ field, fieldState }) => (
                      <Select
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error}
                        label="Jenis Layanan"
                        labelPlacement="outside"
                        placeholder="Pilih Layanan"
                        selectedKeys={[field.value]}
                        variant="bordered"
                        onSelectionChange={(key) => {
                          const val = Array.from(key)[0];

                          field.onChange(val);
                        }}
                      >
                        {profile.services.map((service) => (
                          <SelectItem
                            key={service.name}
                            textValue={service.name}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  <Controller
                    control={control}
                    name="complaint"
                    render={({ field, fieldState }) => (
                      <Textarea
                        {...field}
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error}
                        label="Keluhan / Catatan"
                        labelPlacement="outside"
                        placeholder="Ceritakan keluhan kendaraan Anda..."
                        variant="bordered"
                      />
                    )}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button isLoading={loading} variant="flat" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  className="font-bold px-6"
                  color="danger"
                  isLoading={loading}
                  type="submit"
                >
                  Konfirmasi Booking
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
