import { DatePicker, DatePickerProps } from "@heroui/react";
import { useEffect, useState } from "react";
import { parseDate, CalendarDate } from "@internationalized/date";

export default function CustomDatePicker(props: DatePickerProps) {
  // Fungsi helper untuk mengubah objek Date JS ke CalendarDate (format HeroUI)
  const convertToCalendarDate = (dateInput: any): CalendarDate | null => {
    if (!dateInput) return null;

    // Jika input adalah instance dari Date
    if (dateInput instanceof Date) {
      return new CalendarDate(
        dateInput.getFullYear(),
        dateInput.getMonth() + 1, // JS Month itu 0-indexed
        dateInput.getDate(),
      );
    }

    // Jika input adalah string (ISO format), gunakan parseDate
    if (typeof dateInput === "string") {
      return parseDate(dateInput.split("T")[0]);
    }

    return dateInput; // Return as is jika sudah sesuai format internationalized
  };

  const [value, setValue] = useState(convertToCalendarDate(props.value));

  useEffect(() => {
    setValue(convertToCalendarDate(props.value));
  }, [props.value]);

  return (
    <DatePicker
      {...props}
      showMonthAndYearPickers
      value={value as any}
      onChange={(val) => {
        setValue(val as any);
        console.log("val", val?.toString());
        // Jika ada props onChange dari luar, panggil juga
        if (props.onChange) props.onChange(val?.toString() as any);
      }}
    />
  );
}
