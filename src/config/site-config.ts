export const siteConfig = {
  name: "35utech",
  description: "Merekayasa solusi digital berkinerja tinggi untuk generasi perusahaan global berikutnya.",
  footerText: "© 2026 35utech. Seluruh hak cipta dilindungi.",
  url: "https://35utech.com",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/35utech",
    github: "https://github.com/35utech",
    instagramUrl: "https://instagram.com/35utech",
    facebookUrl: "https://facebook.com/35utech",
    linkedinUrl: "https://linkedin.com/company/35utech",
    whatsappNumber: "6281234567890",
  },
  contact: {
    email: "hello@35utech.com",
    phone: "+62 21 3500 3500",
    address: "Jl. Teknologi No. 35, Jakarta Selatan, Indonesia 12950",
    hours: "Senin – Jumat, 09.00 – 18.00 WIB",
  },
  mainNav: [
    { label: "Beranda", href: "#beranda" },
    { label: "Layanan", href: "#layanan" },
    { label: "Portofolio", href: "#portofolio" },
    { label: "Prestasi", href: "#prestasi" },
    { label: "Kontak", href: "#kontak" },
  ],
  footerNav: {
    expertise: [
      { label: "Rekayasa Perangkat Lunak", href: "#" },
      { label: "Desain Pengalaman", href: "#" },
      { label: "Akselerasi Bisnis", href: "#" },
    ],
    company: [
      { label: "Portofolio", href: "#portofolio" },
      { label: "Layanan", href: "#layanan" },
      { label: "Hubungi Kami", href: "#kontak" },
    ],
  }
};

export type SiteConfig = typeof siteConfig;
