import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Divider,
  NumberInput,
} from "@heroui/react";
import { Car, Save } from "lucide-react";

import { VehicleFormValues, vehicleSchema } from "./schema";

import { http } from "@/utils/libs/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import { useAppDispatch } from "@/stores/hooks";
import { getProfile } from "@/stores/features/auth/auth-action";
import { IVehicle } from "@/utils/interfaces/IUser";

interface Props {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  data?: IVehicle;
}
export default function AddVehicleModal({ isOpen, setOpen, data }: Props) {
  // Hook untuk kontrol Modal
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      transmission_type: "CVT",
      fuel_type: "Bensin",
    },
  });

  useEffect(() => {
    if (data) {
      reset(data as any);
    }
  }, [data]);

  const onSubmit = async (data: VehicleFormValues) => {
    setLoading(true);
    http
      .post("/customers/vehicle", data)
      .then(({ data }) => {
        notify(data.message);
        reset(); // Reset form
        setOpen(false); // Tutup modal
        dispatch(getProfile());
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="3xl"
        onOpenChange={setOpen}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-danger/10 text-danger rounded-lg">
                    <Car size={20} />
                  </div>
                  <span>{data ? "Update" : "Tambah"} Kendaraan</span>
                </div>
              </ModalHeader>

              <ModalBody>
                <div className="space-y-6">
                  {/* Section: Informasi Dasar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...register("plate_number")}
                      errorMessage={errors.plate_number?.message}
                      isInvalid={!!errors.plate_number}
                      label="Nomor Polisi"
                      labelPlacement="outside"
                      placeholder="Contoh: B 1234 ABC"
                      variant="bordered"
                    />
                    <Input
                      {...register("brand")}
                      errorMessage={errors.brand?.message}
                      isInvalid={!!errors.brand}
                      label="Merek"
                      labelPlacement="outside"
                      placeholder="Contoh: Honda"
                      variant="bordered"
                    />
                    <Input
                      {...register("model")}
                      errorMessage={errors.model?.message}
                      isInvalid={!!errors.model}
                      label="Model / Tipe"
                      labelPlacement="outside"
                      placeholder="Contoh: Civic RS"
                      variant="bordered"
                    />
                    <Controller
                      control={control}
                      name="year"
                      render={({ field }) => (
                        <NumberInput
                          hideStepper
                          label="Tahun"
                          labelPlacement="outside"
                          placeholder="2024"
                          value={Number(field.value)}
                          variant="bordered"
                          onValueChange={(val) => field.onChange(val)}
                        />
                      )}
                    />
                    <Input
                      {...register("color")}
                      label="Warna"
                      labelPlacement="outside"
                      placeholder="Putih Mutiara"
                      variant="bordered"
                    />
                    <Controller
                      control={control}
                      name="engine_capacity"
                      render={({ field }) => (
                        <NumberInput
                          hideStepper
                          endContent="cc"
                          label="Kapasitas Mesin"
                          labelPlacement="outside"
                          placeholder="1500"
                          value={Number(field.value)}
                          variant="bordered"
                          onValueChange={(val) => field.onChange(val)}
                        />
                      )}
                    />
                  </div>

                  <Divider />

                  {/* Section: Spesifikasi Teknis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      {...register("transmission_type")}
                      defaultSelectedKeys={["CVT"]}
                      label="Transmisi"
                      labelPlacement="outside"
                      variant="bordered"
                    >
                      <SelectItem key="CVT">CVT</SelectItem>
                      <SelectItem key="AT">Automatic (AT)</SelectItem>
                      <SelectItem key="MT">Manual (MT)</SelectItem>
                    </Select>

                    <Select
                      {...register("fuel_type")}
                      defaultSelectedKeys={["Bensin"]}
                      label="Bahan Bakar"
                      labelPlacement="outside"
                      variant="bordered"
                    >
                      <SelectItem key="Bensin">Bensin</SelectItem>
                      <SelectItem key="Diesel">Diesel</SelectItem>
                      <SelectItem key="Listrik">Listrik</SelectItem>
                    </Select>

                    <Input
                      {...register("vin_number")}
                      label="Nomor Rangka"
                      labelPlacement="outside"
                      placeholder="Masukkan No. Rangka"
                      variant="bordered"
                    />
                    <Input
                      {...register("engine_number")}
                      label="Nomor Mesin"
                      labelPlacement="outside"
                      placeholder="Masukkan No. Mesin"
                      variant="bordered"
                    />
                    <Input
                      {...register("tire_size")}
                      className="md:col-span-2"
                      label="Ukuran Ban"
                      labelPlacement="outside"
                      placeholder="185/65 R15"
                      variant="bordered"
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button isLoading={loading} variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  className="font-bold"
                  color="danger"
                  isLoading={loading}
                  startContent={!loading && <Save size={18} />}
                  type="submit"
                >
                  {data ? "Update" : "Simpan"} Kendaraan
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
