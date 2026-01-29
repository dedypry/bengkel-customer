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
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useState } from "react";

import { useAppSelector } from "@/stores/hooks";
import { formatIDR, formatNumber } from "@/utils/helpers/format";
import { handleDownload } from "@/utils/helpers/global";

interface ServiceDetailProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ServiceDetailModal({
  isOpen,
  onOpenChange,
}: ServiceDetailProps) {
  const { detail } = useAppSelector((state) => state.wo);
  const [printLoading, setPrintLoading] = useState(false);

  const { t } = useTranslation();

  if (!detail) return null;

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
                  <span className="text-xl font-black text-gray-500">
                    DETAIL INVOICE #{detail.trx_no}
                  </span>
                </div>

                <Chip
                  color="success"
                  startContent={<CheckCircle2 size={14} />}
                  variant="flat"
                >
                  {t(detail.status!)}
                </Chip>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              {/* Info Utama: Kendaraan & Tanggal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-gray-600">
                      <Car size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Kendaraan
                      </p>
                      <p className="font-bold text-gray-500 text-sm">
                        {detail?.vehicle?.brand} {detail?.vehicle?.model} (
                        {detail?.vehicle?.year})
                      </p>
                      <p className="text-xs text-default-700">
                        {detail?.vehicle?.plate_number} •{" "}
                        {detail?.vehicle?.color}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-default-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Waktu Servis
                      </p>
                      <p className="font-bold text-gray-500 text-sm">
                        {dayjs(detail.created_at).format("DD MMMM YYYY")}
                      </p>
                      <p className="text-xs text-default-600">
                        {dayjs(detail.start_at).format("HH:mm")} -{" "}
                        {dayjs(detail.end_at).format("HH:mm WIB")}
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
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        Mekanik
                      </p>
                      <p className="font-bold text-gray-500 text-xs">
                        {detail.mechanics.map((mech) => mech.name).join(", ")}
                      </p>

                      {/* <p className="text-sm text-default-400">
                        Senior Technician
                      </p> */}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-default-100 rounded-lg text-default-600">
                      <Wrench size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">
                        KM Kendaraan
                      </p>
                      <p className="font-bold text-gray-500 text-sm">
                        {formatNumber(detail.current_km)} KM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Rincian Pekerjaan & Part */}
              <h4 className="font-bold text-gray-500 mb-4">
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
                  {[...detail.services, ...detail.spareparts].map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-divider/50"
                    >
                      <TableCell className="text-sm">
                        {item.data?.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.qty)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatIDR(
                          (item.data as any)?.purchase_price ||
                            (item.data as any)?.price,
                        )}
                      </TableCell>
                      <TableCell className="text-right font-bold text-gray-500">
                        {formatIDR(item.total_price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Ringkasan Biaya */}
              <div className="bg-default-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    {formatIDR(detail.sub_total)}
                  </span>
                </div>
                {(detail?.promo_data || []).map((promo, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-success"
                  >
                    <span>
                      {promo.name}{" "}
                      {promo.type === "percentage"
                        ? `(${promo.value}%) `
                        : `(${formatIDR(promo.value)})`}
                      MAX {formatIDR(promo.max_discount)}
                    </span>
                    <span>- {formatIDR(promo.price)}</span>
                  </div>
                ))}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Pajak (PPN {formatNumber(detail.ppn_percent)}%)
                  </span>
                  <span>{formatIDR(detail.ppn_amount)}</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-500">TOTAL BAYAR</span>
                  <span className="text-xl font-black text-danger">
                    {formatIDR(detail.grand_total)}
                  </span>
                </div>
              </div>

              {/* Catatan Mekanik */}
              <div className="mt-6 p-4 border-l-4 border-warning bg-warning/5 rounded-r-xl">
                <h5 className="text-sm font-bold text-warning-700 flex items-center gap-2">
                  <FileText size={16} /> Catatan Teknisi
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: detail.next_sugestion || "",
                  }}
                  className="text-sm text-default-600 mt-1 italic"
                />
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
                isLoading={printLoading}
                startContent={<Printer size={18} />}
                variant="flat"
                onPress={() =>
                  handleDownload(
                    `/invoices/${detail.id}`,
                    detail.trx_no,
                    true,
                    setPrintLoading,
                  )
                }
              >
                Cetak Invoice
              </Button>
              <Button
                className="font-bold shadow-lg shadow-danger/20"
                color="danger"
                isLoading={printLoading}
                startContent={<Download size={18} />}
                onPress={() =>
                  handleDownload(
                    `/invoices/${detail.id}`,
                    detail.trx_no,
                    false,
                    setPrintLoading,
                  )
                }
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
