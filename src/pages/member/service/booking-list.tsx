import { Card, CardBody, Chip, Button } from "@heroui/react";
import { Clock, CalendarDays, History } from "lucide-react";
import { useEffect } from "react";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getBooking } from "@/stores/features/booking/booking-action";
import CustomPagination from "@/components/custom-pagination";
import { setBookingQuery } from "@/stores/features/booking/booking-slice";
import { confirmSweat, notify, notifyError } from "@/utils/helpers/notify";
import { http } from "@/utils/libs/axios";

export default function BookingList() {
  const { bookings, bookingQuery } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooking(bookingQuery));
  }, [bookingQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "CONFIRMED":
        return "primary";
      case "ARRIVED":
        return "success";
      case "CANCELLED":
        return "danger";
      default:
        return "default";
    }
  };

  function handleDelete(id: number) {
    http
      .delete(`/bookings/${id}`)
      .then(({ data }) => {
        notify(data.message);
        dispatch(getBooking(bookingQuery));
      })
      .catch((err) => notifyError(err));
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Contoh Item Booking - Idealnya Map dari API */}
      {bookings?.data.map((item) => (
        <Card key={item.id} className="border-1 border-divider shadow-sm">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-danger-50 text-danger rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-[#0B1C39] uppercase">
                      {item.vehicle?.brand} {item.vehicle?.model} (
                      {item.vehicle?.plate_number})
                    </p>
                    <Chip
                      color={getStatusColor("PENDING")}
                      size="sm"
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <CalendarDays size={14} />{" "}
                    {dayjs(item.booking_date).format("DD MMM YYYY")} •{" "}
                    {item.booking_time} WIB
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Keluhan: {item.complaint}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* <Button size="sm" variant="bordered">
                  Detail
                </Button> */}
                <Button
                  color="danger"
                  size="sm"
                  variant="flat"
                  onPress={() =>
                    confirmSweat(() => handleDelete(item.id), {
                      confirmButtonText: "Ya. Batalkan!",
                      text: "Data yang di batalkan tidak dapat dikembalikan",
                    })
                  }
                >
                  Batal
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}

      {/* State jika kosong */}
      {!bookings || bookings.data.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-divider rounded-xl">
          <History className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">Belum ada jadwal booking</p>
          <p className="text-xs text-gray-400">
            Klik tombol Booking Servis untuk membuat janji temu
          </p>
        </div>
      ) : (
        <CustomPagination
          className="mt-5"
          meta={bookings.meta}
          onChange={(page) => dispatch(setBookingQuery({ page }))}
        />
      )}
    </div>
  );
}
