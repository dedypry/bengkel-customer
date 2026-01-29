import { cn, Pagination } from "@heroui/react";

import { IMeta } from "@/utils/interfaces/IPagination";

interface Props {
  meta: IMeta;
  onChange: (val: number) => void;
  className?: string;
}
export default function CustomPagination({ meta, onChange, className }: Props) {
  if (!meta) return null;

  return (
    <div className={cn(["flex w-full justify-between", className])}>
      <p className="text-xs text-gray-400 font-medium italic">
        Menampilkan {meta.to} riwayat terakhir dari total {meta.total} data.
      </p>

      <Pagination
        showControls
        showShadow
        classNames={{
          item: "cursor-pointer",
          next: "cursor-pointer",
          prev: "cursor-pointer",
        }}
        initialPage={meta.page}
        total={meta.lastPage}
        onChange={onChange}
      />
    </div>
  );
}
