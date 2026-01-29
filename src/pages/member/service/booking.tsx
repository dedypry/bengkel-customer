import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Divider,
} from "@heroui/react";
import {
  CalendarDays,
  Clock,
  Toolbox,
  CarFront,
  CalendarCheck,
} from "lucide-react";
import { getLocalTimeZone, today } from "@internationalized/date";
import dayjs from "dayjs";
import { useState } from "react";

import { BookingFormValues, bookingSchema } from "./schema";

import CustomDatePicker from "@/components/forms/date-picker";
import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

interface BookingModalProps {
  vehicles: any[]; // Data kendaraan user dari database
}

export default function BookingModal({ vehicles }: BookingModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const {
    control,
    register,
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
    console.log("Submitting Booking:", data);
    setLoading(true);
    http
      .post("/bookings", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
        onClose();
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        className="font-bold"
        color="danger"
        startContent={<CalendarCheck size={20} />}
        variant="shadow"
        onPress={onOpen}
      >
        Booking Servis Sekarang
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="2xl"
        onOpenChange={onOpenChange}
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
                  <Select
                    {...register("vehicle_id")}
                    errorMessage={errors.vehicle_id?.message}
                    isInvalid={!!errors.vehicle_id}
                    label="Kendaraan"
                    labelPlacement="outside"
                    placeholder="Pilih kendaraan Anda"
                    startContent={
                      <CarFront className="text-default-400" size={18} />
                    }
                    variant="bordered"
                  >
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} textValue={v.plate_number}>
                        {v.brand} {v.model} ({v.plate_number})
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Select
                      {...register("booking_time")}
                      errorMessage={errors.booking_time?.message}
                      isInvalid={!!errors.booking_time}
                      label="Jam"
                      labelPlacement="outside"
                      placeholder="Pilih Slot"
                      startContent={
                        <Clock className="text-default-400" size={18} />
                      }
                      variant="bordered"
                    >
                      <SelectItem key="08:00">08:00 WIB</SelectItem>
                      <SelectItem key="10:00">10:00 WIB</SelectItem>
                      <SelectItem key="13:00">13:00 WIB</SelectItem>
                      <SelectItem key="15:00">15:00 WIB</SelectItem>
                    </Select>
                  </div>

                  <Divider className="mb-10" />

                  <Select
                    {...register("service_type")}
                    errorMessage={errors.service_type?.message}
                    isInvalid={!!errors.service_type}
                    label="Kategori Servis"
                    labelPlacement="outside"
                    placeholder="Pilih tipe servis"
                    startContent={
                      <Toolbox className="text-default-400" size={18} />
                    }
                    variant="bordered"
                  >
                    <SelectItem key="Ganti Oli">Ganti Oli</SelectItem>
                    <SelectItem key="Service Berkala">
                      Service Berkala
                    </SelectItem>
                    <SelectItem key="General Repair">Perbaikan Umum</SelectItem>
                  </Select>

                  <Textarea
                    {...register("complaint")}
                    errorMessage={errors.complaint?.message}
                    isInvalid={!!errors.complaint}
                    label="Keluhan / Catatan"
                    labelPlacement="outside"
                    placeholder="Ceritakan keluhan kendaraan Anda..."
                    variant="bordered"
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
