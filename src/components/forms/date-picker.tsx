/* eslint-disable import/order */
import { Input, InputProps } from "@heroui/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar1Icon } from "lucide-react";

import dayjs from "dayjs";
import id from "date-fns/locale/id";

interface Props {
  maxDate?: Date;
  minDate?: Date;
}

function toNativeDate(value?: Date | string | number | null) {
  if (value == null || value === "") {
    return undefined;
  }

  const date = value instanceof Date ? value : dayjs(value as any).toDate();

  return Number.isNaN(date.getTime()) ? undefined : date;
}

function CustomDatePicker(
  { maxDate, minDate, ...props }: Props & InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedDate = toNativeDate(props.value as any) || new Date();
  const calendarMinDate = toNativeDate(minDate as any);
  const calendarMaxDate = toNativeDate(maxDate as any);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        ref={ref}
        {...props}
        readOnly
        endContent={
          <Calendar1Icon
            className="text-secondary-600 cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((prev) => !prev);
            }}
          />
        }
        value={dayjs(selectedDate).format("DD MMMM YYYY")}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="absolute left-0 top-[calc(100%+0.25rem)] z-[60] rounded-xl border border-default-200 bg-content1 p-1 shadow-lg">
          <Calendar
            color="#077fb6"
            date={selectedDate}
            locale={id}
            {...(calendarMaxDate && { maxDate: calendarMaxDate })}
            {...(calendarMinDate && { minDate: calendarMinDate })}
            onChange={(date) => {
              if (props.onChange) {
                props.onChange(dayjs(date).format("YYYY-MM-DD") as any);
              }
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default forwardRef(CustomDatePicker);
