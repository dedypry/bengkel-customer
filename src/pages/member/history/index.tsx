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
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Search, Download, Eye, FileText, Car, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import ServiceDetailModal from "./detail";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getWo, getWoDetail } from "@/stores/features/wo/wo-action";
import { formatIDR } from "@/utils/helpers/format";
import CustomPagination from "@/components/custom-pagination";
import { setWoQuery } from "@/stores/features/wo/wo-slice";
import { handleDownload } from "@/utils/helpers/global";

export default function MemberHistoryPage() {
  const { history, woQuery } = useAppSelector((state) => state.wo);
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [printLoading, setPrintLoading] = useState(0);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getWo(woQuery));
  }, [woQuery]);

  const veh = (user?.vehicles || []).find((v) => v.id === woQuery.vehicle_id);

  return (
    <div className="flex flex-col gap-6">
      <ServiceDetailModal isOpen={open} onOpenChange={() => setOpen(!open)} />
      {/* Header & Statistik Ringkas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1C39]">Riwayat Service</h1>
          <p className="text-default-500 text-sm">
            Lihat semua catatan perawatan kendaraan Anda.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            color="primary"
            startContent={<FileText size={18} />}
            variant="flat"
          >
            Ekspor PDF
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border-1 border-divider">
        <Input
          isClearable
          className="w-full md:max-w-[400px]"
          placeholder="Cari berdasarkan invoice atau jenis servis..."
          startContent={<Search className="text-default-400" size={18} />}
          variant="bordered"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <Dropdown>
            <DropdownTrigger>
              <Button startContent={<Car size={18} />} variant="bordered">
                {veh ? `${veh?.brand} ${veh?.model}` : "Semua Kendaraan"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Vehicle Filter">
              <DropdownItem
                key="all"
                onClick={() => dispatch(setWoQuery({ vehicle_id: null }))}
              >
                Semua Kendaraan
              </DropdownItem>
              <>
                {(user?.vehicles || []).map((vehicle) => (
                  <DropdownItem
                    key={vehicle.id}
                    onClick={() =>
                      dispatch(setWoQuery({ vehicle_id: vehicle.id }))
                    }
                  >
                    {vehicle.brand} {vehicle.model}
                    {" | "}
                    <Chip radius="sm">{vehicle.plate_number}</Chip>
                  </DropdownItem>
                ))}
              </>
            </DropdownMenu>
          </Dropdown>

          {/* <Dropdown>
            <DropdownTrigger>
              <Button startContent={<Filter size={18} />} variant="bordered">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Status Filter">
              <DropdownItem key="selesai">Selesai</DropdownItem>
              <DropdownItem key="proses">Sedang Proses</DropdownItem>
              <DropdownItem key="batal">Dibatalkan</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </div>
      </div>

      {/* Table Section */}
      <Card className="shadow-sm border-1 border-divider">
        <CardBody className="p-0">
          <Table
            aria-label="Tabel Riwayat Service"
            classNames={{
              th: "bg-default-50 text-default-600 font-bold h-12",
              td: "py-4",
            }}
            selectionMode="single"
            shadow="none"
          >
            <TableHeader>
              <TableColumn>INVOICE</TableColumn>
              <TableColumn>TANGGAL & KENDARAAN</TableColumn>
              <TableColumn>JENIS LAYANAN</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>TOTAL BIAYA</TableColumn>
              <TableColumn align="center">AKSI</TableColumn>
            </TableHeader>
            <TableBody>
              {(history?.data || []).map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b-1 border-divider last:border-0"
                >
                  <TableCell>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-primary">
                        {item.trx_no}
                      </span>
                      <Chip radius="sm" size="sm">
                        {item.vehicle.plate_number}
                      </Chip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {dayjs(item.created_at).format("dd, DD MMM YYYY")}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {item.vehicle.brand} {item.vehicle.model}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-default-100 rounded text-gray-600">
                        <Wrench size={14} />
                      </div>
                      <span className="text-xs">
                        {item.services.length > 0
                          ? item.services[0].data?.name
                          : "-"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        item.status === "Selesai"
                          ? "success"
                          : item.status === "Dibatalkan"
                            ? "danger"
                            : "warning"
                      }
                      size="sm"
                      variant="flat"
                    >
                      {t(item.status!)}
                    </Chip>
                  </TableCell>
                  <TableCell className="font-black text-[#0B1C39]">
                    {formatIDR(item.grand_total)}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        title="Lihat Detail"
                        variant="light"
                        onPress={() => {
                          dispatch(getWoDetail(item.id));
                          setOpen(true);
                        }}
                      >
                        <Eye className="text-gray-500" size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        isLoading={printLoading === item.id}
                        size="sm"
                        title="Download Invoice"
                        variant="light"
                        onPress={() =>
                          handleDownload(
                            `/invoices/${item.id}`,
                            item.trx_no,
                            false,
                            () => setPrintLoading(item.id),
                          )
                        }
                      >
                        <Download size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CustomPagination
            className="px-5 pb-5"
            meta={history?.meta!}
            onChange={(page) => dispatch(setWoQuery({ page }))}
          />
        </CardBody>
      </Card>
    </div>
  );
}
