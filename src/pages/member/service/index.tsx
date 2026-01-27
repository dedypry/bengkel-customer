import {
  Card,
  CardBody,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Plus, History, Car, ChevronRight, CalendarDays } from "lucide-react";

export default function MemberServicePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1C39]">Layanan Servis</h1>
          <p className="text-default-500 text-sm">
            Kelola kendaraan dan jadwal perawatan Anda.
          </p>
        </div>
        <Button
          className="font-bold uppercase tracking-wider"
          color="danger"
          startContent={<Plus size={18} />}
          onPress={onOpen}
        >
          Booking Servis
        </Button>
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
            {[
              {
                name: "Toyota Avanza",
                plate: "B 1234 ABC",
                color: "Hitam",
                year: "2020",
              },
              {
                name: "Honda Vario 150",
                plate: "B 5566 DEF",
                color: "Merah",
                year: "2022",
              },
            ].map((car, idx) => (
              <Card
                key={idx}
                isPressable
                className="border-1 border-divider shadow-sm hover:border-danger transition-colors"
              >
                <CardBody className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-default-100 rounded-full flex items-center justify-center text-default-600">
                      <Car size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1C39]">{car.name}</p>
                      <p className="text-xs text-default-500">
                        {car.plate} • {car.color}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-default-300" size={20} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>

        {/* TAB 2: RIWAYAT SERVIS */}
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2">
              <History size={18} />
              <span>Riwayat Servis</span>
            </div>
          }
        >
          <div className="mt-4">
            <Table
              aria-label="Riwayat Servis Table"
              className="border-1 border-divider rounded-xl"
              shadow="none"
            >
              <TableHeader>
                <TableColumn>TANGGAL</TableColumn>
                <TableColumn>KENDARAAN</TableColumn>
                <TableColumn>JENIS SERVIS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>TOTAL</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>12 Jan 2024</TableCell>
                  <TableCell>Toyota Avanza</TableCell>
                  <TableCell>Ganti Oli & Cek Rem</TableCell>
                  <TableCell>
                    <Chip color="success" size="sm" variant="flat">
                      Selesai
                    </Chip>
                  </TableCell>
                  <TableCell className="font-bold">Rp 450.000</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>05 Des 2023</TableCell>
                  <TableCell>Honda Vario</TableCell>
                  <TableCell>Tune Up Rutin</TableCell>
                  <TableCell>
                    <Chip color="success" size="sm" variant="flat">
                      Selesai
                    </Chip>
                  </TableCell>
                  <TableCell className="font-bold">Rp 150.000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Tab>
      </Tabs>

      {/* Modal Booking (Simple Placeholder) */}
      <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#0B1C39]">
                Booking Servis Baru
              </ModalHeader>
              <ModalBody>
                <p className="text-default-500 text-sm mb-4">
                  Pilih kendaraan dan tentukan jadwal kunjungan Anda ke bengkel.
                </p>
                {/* Kamu bisa masukkan form useForm & zod di sini nanti */}
                <div className="p-10 border-2 border-dashed border-divider rounded-xl text-center">
                  <CalendarDays
                    className="mx-auto text-default-300 mb-2"
                    size={48}
                  />
                  <p className="text-default-400 font-medium">
                    Formulir Booking Akan Muncul di Sini
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="danger" onPress={onClose}>
                  Lanjutkan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
