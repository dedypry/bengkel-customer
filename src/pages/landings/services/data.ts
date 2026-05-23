export interface ILandingService {
  id: string;
  title: string;
  image: string;
  heading: string;
  description: string;
  points: string[];
}

export const landingServices: ILandingService[] = [
  {
    id: "diag",
    title: "Diagnosa Menyeluruh",
    image: "/pradana-4.jpg",
    heading: "Kenali Kondisi Mobil Sebelum Terlambat",
    description:
      "Pemeriksaan sistem mesin, kelistrikan, dan sensor dilakukan menyeluruh untuk mendeteksi gejala sejak dini.",
    points: [
      "Scanner dan analisa data real-time",
      "Laporan kondisi mobil yang mudah dibaca",
      "Rekomendasi perbaikan sesuai prioritas",
    ],
  },
  {
    id: "eng",
    title: "Servis Mesin",
    image: "/pradana-1.jpg",
    heading: "Performa Mesin Kembali Optimal",
    description:
      "Cocok untuk mobil yang mulai terasa berat, brebet, boros, atau muncul gejala overheat.",
    points: [
      "Tune up dan pembersihan komponen penting",
      "Pengecekan sistem pendingin",
      "Perbaikan berdasarkan hasil diagnosa",
    ],
  },
  {
    id: "tire",
    title: "Ban & Kaki-kaki",
    image: "/pradana-2.jpg",
    heading: "Lebih Stabil, Nyaman, dan Aman",
    description:
      "Untuk Anda yang sering melewati jalan tidak rata atau mulai merasakan getaran dan bunyi pada kaki-kaki.",
    points: [
      "Cek keausan ban dan tekanan ideal",
      "Pemeriksaan kaki-kaki dan suspensi",
      "Saran penggantian sesuai kondisi pakai",
    ],
  },
  {
    id: "oil",
    title: "Ganti Oli Cepat",
    image: "/pradana-3.jpg",
    heading: "Servis Ringan, Efeknya Besar",
    description:
      "Paket servis cepat untuk menjaga usia mesin dan performa harian, tanpa antre panjang.",
    points: [
      "Pilihan oli sesuai karakter mesin",
      "Pengecekan cairan pendukung",
      "Estimasi waktu pengerjaan yang jelas",
    ],
  },
];
