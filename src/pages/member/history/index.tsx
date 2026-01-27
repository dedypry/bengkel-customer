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
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Car,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import ServiceDetailModal from "./detail";

export default function MemberHistoryPage() {
  const [open, setOpen] = useState(false);
  const historyData = [
    {
      id: "INV-9920",
      date: "24 Jan 2024",
      vehicle: "Toyota Avanza (B 1234 ABC)",
      service: "Ganti Oli Shell Helix & Filter",
      status: "Selesai",
      amount: "Rp 550.000",
    },
    {
      id: "INV-9811",
      date: "10 Des 2023",
      vehicle: "Honda Vario (B 5566 DEF)",
      service: "Servis CVT & Ganti Kampas Rem",
      status: "Selesai",
      amount: "Rp 210.000",
    },
    {
      id: "INV-9502",
      date: "15 Okt 2023",
      vehicle: "Toyota Avanza (B 1234 ABC)",
      service: "Spooring & Balancing",
      status: "Dibatalkan",
      amount: "Rp 350.000",
    },
  ];

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
                Pilih Kendaraan
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Vehicle Filter">
              <DropdownItem key="all">Semua Kendaraan</DropdownItem>
              <DropdownItem key="avanza">Toyota Avanza</DropdownItem>
              <DropdownItem key="vario">Honda Vario</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
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
          </Dropdown>
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
              {historyData.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b-1 border-divider last:border-0"
                >
                  <TableCell>
                    <span className="font-bold text-primary">{item.id}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{item.date}</span>
                      <span className="text-xs text-default-400">
                        {item.vehicle}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-default-100 rounded text-default-600">
                        <Wrench size={14} />
                      </div>
                      <span className="text-sm">{item.service}</span>
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
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell className="font-black text-[#0B1C39]">
                    {item.amount}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        title="Lihat Detail"
                        variant="light"
                        onPress={() => setOpen(true)}
                      >
                        <Eye className="text-default-500" size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        title="Download Invoice"
                        variant="light"
                      >
                        <Download size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Pagination Placeholder */}
      <div className="flex justify-center mt-4">
        <p className="text-xs text-default-400 font-medium italic">
          Menampilkan 3 riwayat terakhir dari total 12 data.
        </p>
      </div>
    </div>
  );
}
