import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  FileText,
  Calendar,
  Car,
  User,
  Wrench,
  CheckCircle2,
  Download,
  Printer,
} from "lucide-react";

interface ServiceDetailProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ServiceDetailModal({
  isOpen,
  onOpenChange,
}: ServiceDetailProps) {
  // Data dummy untuk rincian part
  const items = [
    { id: 1, name: "Oli Mesin Shell Helix HX8 5W-30", qty: 1, price: 450000 },
    { id: 2, name: "Filter Oli Toyota Original", qty: 1, price: 75000 },
    { id: 3, name: "Pembersih Rem (Brake Cleaner)", qty: 2, price: 50000 },
    { id: 4, name: "Jasa Servis Berkala 10.000km", qty: 1, price: 250000 },
  ];

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b border-divider">
              <div className="flex justify-between items-center pr-6">
                <div className="flex items-center gap-2">
                  <FileText className="text-danger" size={20} />
                  <span className="text-xl font-black text-[#0B1C39]">
                    DETAIL INVOICE #INV-9920
                  </span>
                </div>
                <Chip
                  color="success"
                  startContent={<CheckCircle2 size={14} />}
                  variant="flat"
                >
                  Lunas
                </Chip>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              {/* Info Utama: Kendaraan & Tanggal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-default-600">
                      <Car size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 uppercase font-bold">
                        Kendaraan
                      </p>
                      <p className="font-bold text-[#0B1C39]">
                        Toyota Avanza (2020)
                      </p>
                      <p className="text-sm text-default-400">
                        B 1234 ABC • Hitam
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-default-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 uppercase font-bold">
                        Waktu Servis
                      </p>
                      <p className="font-bold text-[#0B1C39]">
                        24 Januari 2026
                      </p>
                      <p className="text-sm text-default-400">
                        09:00 - 11:30 WIB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-default-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 uppercase font-bold">
                        Mekanik
                      </p>
                      <p className="font-bold text-[#0B1C39]">Agus Setiawan</p>
                      <p className="text-sm text-default-400">
                        Senior Technician
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-default-600">
                      <Wrench size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-default-500 uppercase font-bold">
                        KM Kendaraan
                      </p>
                      <p className="font-bold text-[#0B1C39]">45.230 KM</p>
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Rincian Pekerjaan & Part */}
              <h4 className="font-bold text-[#0B1C39] mb-4">
                Rincian Suku Cadang & Jasa
              </h4>
              <Table removeWrapper aria-label="Rincian Biaya" className="mb-6">
                <TableHeader>
                  <TableColumn>ITEM / DESKRIPSI</TableColumn>
                  <TableColumn align="center">QTY</TableColumn>
                  <TableColumn align="end">HARGA SATUAN</TableColumn>
                  <TableColumn align="end">SUBTOTAL</TableColumn>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-divider/50"
                    >
                      <TableCell className="text-sm">{item.name}</TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right">
                        Rp {item.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold text-[#0B1C39]">
                        Rp {(item.price * item.qty).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Ringkasan Biaya */}
              <div className="bg-default-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-default-500">Subtotal</span>
                  <span className="font-medium">
                    Rp {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-success">
                  <span>Diskon Member (10%)</span>
                  <span>- Rp {(total * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-default-500">Pajak (PPN 11%)</span>
                  <span>Rp {(total * 0.11).toLocaleString()}</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-black text-[#0B1C39]">TOTAL BAYAR</span>
                  <span className="text-xl font-black text-danger">
                    Rp {(total - total * 0.1 + total * 0.11).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Catatan Mekanik */}
              <div className="mt-6 p-4 border-l-4 border-warning bg-warning/5 rounded-r-xl">
                <h5 className="text-sm font-bold text-warning-700 flex items-center gap-2">
                  <FileText size={16} /> Catatan Teknisi
                </h5>
                <p className="text-sm text-default-600 mt-1 italic">
                  &quot;Kampas rem depan sudah mulai tipis (sisa 30%).
                  Disarankan ganti pada kunjungan servis berikutnya atau sekitar
                  3.000 KM lagi.&quot;
                </p>
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-divider">
              <Button
                className="font-bold"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Tutup
              </Button>
              <Button
                color="primary"
                startContent={<Printer size={18} />}
                variant="flat"
              >
                Cetak Invoice
              </Button>
              <Button
                className="font-bold shadow-lg shadow-danger/20"
                color="danger"
                startContent={<Download size={18} />}
              >
                Download PDF
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
