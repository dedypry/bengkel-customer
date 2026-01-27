import { Card, CardBody, Button, Chip, Progress } from "@heroui/react";
import { Wrench, Calendar, ClipboardList, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Ringkasan (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-danger text-white">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs uppercase opacity-80 font-bold">
                Booking Aktif
              </p>
              <h3 className="text-2xl font-black">1</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-default-100 rounded-lg text-danger">
              <Wrench size={24} />
            </div>
            <div>
              <p className="text-xs uppercase text-default-500 font-bold">
                Total Service
              </p>
              <h3 className="text-2xl font-black text-[#0B1C39]">12</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-default-100 rounded-lg text-primary">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-xs uppercase text-default-500 font-bold">
                Poin Member
              </p>
              <h3 className="text-2xl font-black text-[#0B1C39]">450</h3>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Status Progress Service (Current Work) */}
        <Card className="lg:col-span-2">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-lg text-[#0B1C39]">
                Status Service Kendaraan
              </h4>
              <Chip color="warning" size="sm" variant="flat">
                Sedang Dikerjakan
              </Chip>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Toyota Avanza - B 1234 ABC</span>
                <span className="text-default-500">
                  Estimasi Selesai: 14:00
                </span>
              </div>
              <Progress
                aria-label="Service progress"
                className="max-w-md"
                color="danger"
                showValueLabel={true}
                value={65}
              />
              <p className="text-xs text-default-400 italic">
                * Teknisi sedang melakukan penggantian oli dan pengecekan rem.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* 3. Promo atau Aksi Cepat */}
        <Card className="bg-[#0B1C39] text-white overflow-hidden relative">
          <CardBody className="p-6 flex flex-col justify-center gap-3">
            <h4 className="font-bold text-xl">Butuh Service Berkala?</h4>
            <p className="text-sm opacity-80">
              Dapatkan diskon 10% untuk booking via aplikasi hari ini.
            </p>
            <Button
              as={Link}
              className="bg-danger text-white mt-2 font-bold"
              endContent={<ArrowRight size={16} />}
              to="/customer/service"
            >
              Booking Sekarang
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* 4. Riwayat Terakhir */}
      <Card>
        <CardBody className="p-6">
          <h4 className="font-bold text-lg text-[#0B1C39] mb-4">
            Aktivitas Terakhir
          </h4>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b-1 border-divider pb-3 last:border-0 last:pb-0"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Service Rutin Selesai</p>
                    <p className="text-xs text-default-500">
                      20 Jan 2024 • Invoice #INV-8829
                    </p>
                  </div>
                </div>
                <Button color="primary" size="sm" variant="light">
                  Detail
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
