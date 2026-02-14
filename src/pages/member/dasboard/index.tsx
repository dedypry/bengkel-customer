import { Card, CardBody, Button, Chip, Progress } from "@heroui/react";
import {
  Wrench,
  Calendar,
  ClipboardList,
  ArrowRight,
  Bot,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import BookingModal from "../service/booking";

import QuestionAI from "./question";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getDashboard } from "@/stores/features/dashboard/dashboard-action";
import { formatNumber } from "@/utils/helpers/format";

export default function DashboardPage() {
  const { dashboard } = useAppSelector((state) => state.dashboard);
  const [bookingAdd, setBookingAdd] = useState(false);
  const [question, setQuestion] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  console.log(question);

  return (
    <div className="flex flex-col gap-6">
      <BookingModal isOpen={bookingAdd} setOpen={setBookingAdd} />
      <QuestionAI isOpen={question} setOpen={setQuestion} />
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
              <h3 className="text-2xl font-black">
                {formatNumber(dashboard?.bookingActive)}
              </h3>
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
              <h3 className="text-2xl font-black text-[#0B1C39]">
                {formatNumber(dashboard?.totalService)}
              </h3>
            </div>
          </CardBody>
        </Card>

        <Card
          isPressable
          className="cursor-pointer hover:bg-secondary-50 transition-colors border-none shadow-sm bg-gradient-to-br from-indigo-50 to-white"
          onPress={() => setQuestion(true)}
        >
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary rounded-lg text-white shadow-md shadow-indigo-200">
              <Bot size={24} /> {/* Pastikan import Bot dari lucide-react */}
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase text-primary font-bold">
                Tanya AI
              </p>
              <h3 className="text-sm font-bold text-[#0B1C39] leading-tight">
                Konsultasi Keluhan
              </h3>
            </div>
            <div className="text-indigo-300">
              <ChevronRight size={18} />
            </div>
          </CardBody>
        </Card>

        {/* <Card>
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
        </Card> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Status Progress Service (Current Work) */}
        <Card className="lg:col-span-2">
          <CardBody className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-lg text-[#0B1C39]">
                Status Service Kendaraan
              </h4>

              {dashboard?.ongoingService && (
                <Chip color="warning" size="sm" variant="flat">
                  {dashboard?.ongoingService.status}
                </Chip>
              )}
            </div>

            {dashboard?.ongoingService ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {dashboard?.ongoingService?.vehicle?.brand}{" "}
                    {dashboard?.ongoingService?.vehicle?.model} -{" "}
                    {dashboard?.ongoingService?.vehicle?.plate_number}
                  </span>
                  <span className="text-default-500">
                    Estimasi Selesai: {dashboard.ongoingService.end_at}
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
                  * {dashboard.ongoingService.complaints}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="bg-default-100 p-4 rounded-full mb-4">
                  <Wrench className="text-default-400" size={32} />
                </div>
                <p className="text-default-500 font-medium">
                  Tidak ada service aktif
                </p>
                <p className="text-xs text-default-400">
                  Semua kendaraan Anda dalam kondisi prima.
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* 3. Promo atau Aksi Cepat */}
        <Card className="bg-[#0B1C39] text-white overflow-hidden relative">
          <CardBody className="p-6 flex flex-col justify-center gap-3">
            <h4 className="font-bold text-xl">Butuh Service Berkala?</h4>
            <p className="text-sm opacity-80">
              Jaga performa kendaraan Anda dengan melakukan servis rutin di
              bengkel kami.
            </p>
            <Button
              className="bg-danger text-white mt-2 font-bold"
              endContent={<ArrowRight size={16} />}
              onPress={() => setBookingAdd(true)}
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
            {dashboard?.recentActivities &&
            dashboard.recentActivities.length > 0 ? (
              // TAMPILAN JIKA ADA DATA
              dashboard.recentActivities.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b-1 border-divider pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                      <ClipboardList size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Service Rutin Selesai</p>
                      <p className="text-xs text-default-500">
                        {dayjs(item.created_at).format("DD MMM YYYY")} • Invoice
                        #{item.trx_no}
                      </p>
                    </div>
                  </div>
                  <Button color="primary" size="sm" variant="light">
                    Detail
                  </Button>
                </div>
              ))
            ) : (
              // TAMPILAN JIKA TIDAK ADA AKTIVITAS (Empty State)
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-default-50 rounded-full flex items-center justify-center mb-3">
                  <ClipboardList className="text-default-300" size={32} />
                </div>
                <p className="text-sm font-medium text-default-500">
                  Belum ada aktivitas
                </p>
                <p className="text-xs text-default-400">
                  Riwayat service Anda akan muncul di sini setelah selesai.
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
