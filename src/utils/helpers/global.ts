import { http } from "../libs/axios";

import { notifyError } from "./notify";

export function getInitials(name: string): string {
  if (!name) return "";

  return name
    .trim() // Hapus spasi di awal/akhir
    .split(/\s+/) // Pecah berdasarkan spasi
    .slice(0, 2) // Ambil maksimal 2 kata pertama
    .map((word) => word[0]) // Ambil karakter pertama tiap kata
    .join("") // Gabungkan
    .toUpperCase(); // Ubah jadi huruf kapital
}

export const getAvatarByName = (name: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
};

export async function handleDownload(
  linkUrl: string,
  fileName: string = "",
  isRedirect: boolean = false,
  setLoading?: (val: boolean) => void,
) {
  try {
    if (setLoading) {
      setLoading(true);
    }
    // 1. Lakukan request dengan responseType 'blob'
    const response = await http.get(linkUrl, {
      responseType: "blob",
    });

    // 2. Buat URL sementara dari blob tersebut
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    if (isRedirect) {
      window.open(url, "_blank");
    } else {
      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error("Download gagal:", error);
    notifyError("Gagal mendownload PDF");
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
}
