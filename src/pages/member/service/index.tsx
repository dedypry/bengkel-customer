import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import { Plus, Car, ChevronRight } from "lucide-react";
import { useState } from "react";

import AddVehicleModal from "./add-vehicle";
import BookingModal from "./booking";

import { useAppSelector } from "@/stores/hooks";
import { IVehicle } from "@/utils/interfaces/IUser";

export default function MemberServicePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [modalAdd, setModalAdd] = useState(false);
  const [data, setData] = useState<IVehicle>();

  return (
    <div className="flex flex-col gap-6">
      <AddVehicleModal data={data} isOpen={modalAdd} setOpen={setModalAdd} />
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1C39]">Layanan Servis</h1>
          <p className="text-gray-500 text-sm">
            Kelola kendaraan dan jadwal perawatan Anda.
          </p>
        </div>
        <BookingModal vehicles={user?.vehicles || []} />
        {/* <Button
          className="font-bold uppercase tracking-wider"
          color="danger"
          startContent={<Plus size={18} />}
          onPress={onOpen}
        >
          Booking Servis
        </Button> */}
      </div>

      <Tabs
        aria-label="Service Options"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-danger",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-danger font-bold",
        }}
        color="danger"
        variant="underlined"
      >
        {/* TAB 1: KENDARAAN SAYA */}
        <Tab
          key="my-cars"
          title={
            <div className="flex items-center space-x-2">
              <Car size={18} />
              <span>Kendaraan Saya</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {user?.vehicles?.map((car, idx) => (
              <Card
                key={idx}
                isPressable
                className="border-1 border-divider shadow-sm hover:border-danger transition-colors"
                onClick={() => {
                  setData(car);
                  setModalAdd(true);
                }}
              >
                <CardBody className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-default-100 rounded-full flex items-center justify-center text-default-600">
                      <Car size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1C39]">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        {car.plate_number} • {car.color}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-500" size={20} />
                </CardBody>
              </Card>
            ))}
            <Card
              isPressable
              className="border-2 border-dashed border-divider shadow-none bg-transparent hover:bg-default-50 hover:border-danger transition-all group"
              onPress={() => {
                setData(undefined);
                setModalAdd(true);
              }}
            >
              <CardBody className="flex flex-row items-center p-4">
                <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 group-hover:text-danger group-hover:border-danger transition-colors">
                  <Plus size={24} />
                </div>
                <div className="ml-4 text-left">
                  <p className="font-bold text-gray-600 group-hover:text-danger transition-colors">
                    Tambah Kendaraan Baru
                  </p>
                  <p className="text-xs text-gray-400">
                    Daftarkan kendaraan Anda lainnya
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
