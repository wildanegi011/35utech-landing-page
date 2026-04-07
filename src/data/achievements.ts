export interface Achievement {
  id: number;
  title: string;
  year: string;
  description: string;
  category: string;
  scope: "Lokal" | "Nasional";
  image: string;
  icon?: string;
  isPublished: boolean;
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 1,
    title: "Best Fintech Innovation 2025",
    year: "2025",
    description: "Penghargaan atas inovasi sistem perbankan digital terefektif di Asia Tenggara oleh Financial Tech Review.",
    category: "Award",
    scope: "Nasional",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=1200",
    isPublished: true,
  },
  {
    id: 2,
    title: "Top 10 AI Startup Indonesia",
    year: "2024",
    description: "Diakui sebagai salah satu pengembang solusi kecerdasan buatan paling menjanjikan untuk sektor industri.",
    category: "Recognition",
    scope: "Nasional",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    isPublished: true,
  },
  {
    id: 3,
    title: "ISO 27001 Security Certified",
    year: "2024",
    description: "Sertifikasi standar internasional tertinggi untuk manajemen keamanan informasi dan perlindungan data.",
    category: "Certification",
    scope: "Nasional",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    isPublished: true,
  },
  {
    id: 4,
    title: "Sustainable Tech Excellence",
    year: "2023",
    description: "Apresiasi atas komitmen kami dalam membangun solusi teknologi yang ramah lingkungan dan hemat energi.",
    category: "Excellence",
    scope: "Lokal",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    isPublished: true,
  },
  {
    id: 5,
    title: "Local Startup Champion",
    year: "2023",
    description: "Penghargaan Pengembang Teknologi Terpuji di tingkat Provinsi atas kontribusi pada digitalisasi UKM.",
    category: "Award",
    scope: "Lokal",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
    isPublished: true,
  }
];
