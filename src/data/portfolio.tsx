export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  impact: string;
  category: string;
  image: string;
  gallery?: string[];
  aspectRatio: string;
  techStack: { name: string; icon?: string }[];
  features: string[];
  year: string;
  client: string;
  status: string;
  link?: string;
}

export const PORTFOLIO_DATA: Project[] = [
  {
    id: 1,
    slug: "quantum-banking-platform",
    title: "Quantum Banking Platform",
    description: "Sistem perbankan inti dengan arsitektur mikroservis dan keamanan berlapis tingkat tinggi.",
    longDescription: "Quantum Banking Platform adalah solusi perbankan digital generasi baru yang dirancang untuk institusi keuangan modern. Platform ini dibangun menggunakan arsitektur mikroservis yang memungkinkan setiap modul — mulai dari autentikasi, transaksi, hingga pelaporan — beroperasi secara independen dengan ketersediaan tinggi.",
    challenge: "Membangun sistem perbankan yang mampu menangani jutaan transaksi per detik dengan latensi minimal, sambil tetap menjaga standar keamanan perbankan internasional yang sangat ketat.",
    solution: "Kami mengimplementasikan arsitektur mikroservis berbasis Go untuk kecepatan eksekusi, menggunakan Kafka untuk pemrosesan pesan asinkron, dan menerapkan enkripsi end-to-end serta HSM (Hardware Security Module) untuk perlindungan data.",
    impact: "Peningkatan kecepatan transaksi sebesar 300% dan pengurangan downtime sistem hingga 99.99%, memungkinkan klien untuk melakukan ekspansi bisnis ke pasar regional dengan percaya diri.",
    category: "Fintech",
    aspectRatio: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1551288049-bb1c004517ae?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ],
    techStack: [
      { name: "Go" }, { name: "PostgreSQL" }, { name: "Redis" }, { name: "Docker" }, { name: "Kubernetes" }, { name: "gRPC" }
    ],
    features: ["Transaksi real-time sub-milidetik", "Deteksi fraud berbasis AI", "Dashboard analitik komprehensif", "API gateway enterprise"],
    year: "2025",
    client: "Bank Digital Nusantara",
    status: "Aktif",
    link: "https://quantum-bank.35utech.com"
  },
  {
    id: 2,
    slug: "nexus-analitik-ai",
    title: "Nexus Analitik AI",
    description: "Platform analitik data canggih dengan algoritma pembelajaran mesin untuk prediksi bisnis.",
    longDescription: "Nexus Analitik AI adalah platform intelijen bisnis yang mengubah data mentah menjadi wawasan strategis melalui algoritma machine learning mutakhir. Platform ini mampu memproses jutaan data poin secara real-time.",
    challenge: "Mengolah volume data yang sangat besar (terabyte per hari) dari berbagai sumber yang tidak terstruktur menjadi visualisasi yang mudah dipahami oleh pengambil keputusan dalam waktu nyata.",
    solution: "Penggabungan Apache Spark untuk pemrosesan data skala besar dengan model TensorFlow yang dioptimalkan untuk GPU, dikemas dalam antarmuka React yang sangat responsif.",
    impact: "Membantu klien mengidentifikasi inefisiensi operasional senilai $2M per tahun dan meningkatkan akurasi stok inventori hingga 45%.",
    category: "Data Science",
    aspectRatio: "aspect-square",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bb1c004517ae?auto=format&fit=crop&q=80&w=800"
    ],
    techStack: [
      { name: "Python" }, { name: "TensorFlow" }, { name: "Apache Spark" }, { name: "React" }, { name: "AWS" }
    ],
    features: ["Prediksi tren akurasi 94%", "Visualisasi interaktif real-time", "Pipeline ETL otomatis", "Model ML kustom"],
    year: "2025",
    client: "DataCorp Indonesia",
    status: "Aktif",
    link: "https://nexus-ai.35utech.com"
  },
  {
    id: 3,
    slug: "aurora-cloud-engine",
    title: "Aurora Cloud Engine",
    description: "Infrastruktur cloud skalabel dan efisien untuk kebutuhan komputasi enterprise global.",
    longDescription: "Aurora Cloud Engine menyediakan infrastruktur cloud-native yang dirancang khusus untuk beban kerja enterprise berskala besar. Platform ini mengoptimalkan alokasi sumber daya secara dinamis.",
    challenge: "Menyediakan layanan cloud yang stabil dengan latensi rendah di seluruh region Asia Tenggara dengan biaya operasional yang kompetitif.",
    solution: "Membangun sistem orkestrasi Kubernetes multi-region dengan optimasi alogaritma cerdas untuk distribusi beban kerja berdasarkan kedekatan geografis dan ketersediaan sumber daya.",
    impact: "Pengurangan biaya infrastruktur klien sebesar 40% dan peningkatan ketersediaan layanan hingga 99.99%.",
    category: "Infrastructure",
    aspectRatio: "aspect-video",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "Go" }, { name: "Kubernetes" }, { name: "Terraform" }, { name: "AWS" }, { name: "Grafana" }
    ],
    features: ["Auto-scaling cerdas", "Deployment multi-region", "Monitoring terpusat", "Optimasi biaya AI"],
    year: "2024",
    client: "CloudFirst Asia",
    status: "Selesai"
  },
  {
    id: 4,
    slug: "sentinel-cyber-defense",
    title: "Sentinel Cyber Defense",
    description: "Sistem pertahanan keamanan siber proaktif dengan deteksi dan isolasi ancaman otomatis.",
    longDescription: "Sentinel Cyber Defense adalah platform keamanan siber proaktif yang menggabungkan threat intelligence, analisis perilaku, dan respons otomatis.",
    challenge: "Menghadapi serangan siber yang semakin kompleks dan cepat, di mana respons manual manusia tidak lagi memadai untuk mencegah kerusakan data.",
    solution: "Sistem pertahanan otonom yang menggunakan Large Language Models (LLM) untuk menganalisis payload serangan dan secara otomatis menutup celah keamanan dalam hitungan milidetik.",
    impact: "Pencegahan 10.000+ serangan per bulan dengan zero-day success rate 100% pada lingkungan produksi.",
    category: "Security",
    aspectRatio: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "Python" }, { name: "Go" }, { name: "Elasticsearch" }, { name: "Kafka" }, { name: "React" }
    ],
    features: ["Deteksi AI zero-day", "Respons otomatis <1 detik", "Threat intelligence global", "Dashboard SOC 24/7"],
    year: "2025",
    client: "SecureNet Global",
    status: "Aktif"
  },
  {
    id: 5,
    slug: "ecotrack-smart-logistics",
    title: "EcoTrack Smart Logistics",
    description: "Otomatisasi rantai pasokan berbasis IoT untuk efisiensi logistik ramah lingkungan.",
    longDescription: "EcoTrack Smart Logistics merevolusi manajemen rantai pasokan dengan menggabungkan sensor IoT, analitik prediktif, dan optimasi rute berbasis AI.",
    challenge: "Kurangnya visibilitas dalam rantai pasokan yang menyebabkan pemborosan bahan bakar dan keterlambatan pengiriman barang sensitif.",
    solution: "Implementasi jaringan sensor IoT end-to-end yang terhubung ke cloud digital twin, memungkinkan simulasi dan optimasi rute secara real-time.",
    impact: "Penurunan emisi karbon sebesar 30% dan peningkatan efisiensi pengiriman sebesar 25%.",
    category: "Logistics",
    aspectRatio: "aspect-square",
    image: "https://images.unsplash.com/photo-1586528116311-ad86d7c4bd62?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "Node.js" }, { name: "React" }, { name: "MongoDB" }, { name: "MQTT" }, { name: "AWS IoT" }
    ],
    features: ["Pelacakan IoT real-time", "Reduksi emisi 30%", "Prediksi delay akurat", "Dashboard supply chain"],
    year: "2024",
    client: "LogiGreen Indonesia",
    status: "Aktif"
  },
  {
    id: 6,
    slug: "titan-health-hub",
    title: "Titan Health Hub",
    description: "Platform manajemen rekam medis digital terenkripsi untuk institusi kesehatan global.",
    longDescription: "Titan Health Hub adalah ekosistem kesehatan digital yang mengintegrasikan rekam medis elektronik, sistem penjadwalan, dan telemedicine.",
    challenge: "Menjaga privasi data medis pasien yang sangat sensitif sambil tetap memungkinkan akses cepat bagi tenaga medis di berbagai lokasi geografis.",
    solution: "Sistem database terdistribusi dengan enkripsi tingkat militer dan kontrol akses berbasis peran (RBAC) yang sangat granular, didukung oleh infrastruktur blockchain untuk audit trail data.",
    impact: "Mempercepat waktu tunggu pasien sebesar 40% dan memastikan kepatuhan standar keamanan data kesehatan internasional 100%.",
    category: "Health Tech",
    aspectRatio: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "TypeScript" }, { name: "Next.js" }, { name: "PostgreSQL" }, { name: "Redis" }, { name: "Docker" }
    ],
    features: ["Rekam medis terenkripsi", "Telemedicine HD", "Interoperabilitas FHIR", "Penjadwalan pintar"],
    year: "2025",
    client: "MediCare Asia",
    status: "Aktif"
  },
  {
    id: 7,
    slug: "gridos-smart-energy",
    title: "GridOS Smart Energy",
    description: "Optimasi distribusi energi terbarukan melalui jaringan grid pintar yang adaptif.",
    longDescription: "GridOS Smart Energy mengoptimalkan distribusi energi terbarukan melalui jaringan grid cerdas yang memanfaatkan AI dan IoT.",
    challenge: "Ketidakstabilan pasokan energi dari sumber terbarukan (angin & surya) yang sulit diprediksi untuk memenuhi permintaan beban listrik.",
    solution: "Sistem manajemen energi berbasis AI yang melakukan peramalan konsumsi dan optimasi penyimpanan energi (BESS) secara real-time.",
    impact: "Peningkatan efisiensi distribusi energi sebesar 20% dan pengurangan ketergantungan pada sumber energi fosil sebesar 15%.",
    category: "Green Tech",
    aspectRatio: "aspect-video",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "Python" }, { name: "Go" }, { name: "TimescaleDB" }, { name: "Grafana" }, { name: "MQTT" }
    ],
    features: ["Forecast energi AI", "Manajemen baterai BESS", "Monitoring grid real-time", "Reduksi waste 25%"],
    year: "2024",
    client: "EnergiHijau Nusantara",
    status: "Eksperimental"
  },
  {
    id: 8,
    slug: "omnichannel-commerce",
    title: "OmniChannel Commerce",
    description: "Pengalaman belanja terintegrated yang menyatukan ritel fisik dan digital.",
    longDescription: "OmniChannel Commerce adalah platform e-commerce generasi baru yang menghubungkan pengalaman belanja online dan offline secara mulus.",
    challenge: "Data inventaris dan penjualan yang terfragmentasi antar kanal, menyebabkan ketidakefisienan operasional dan pengalaman pelanggan yang buruk.",
    solution: "Arsitektur Unified Commerce yang mensinkronisasi data dari berbagai titik penjualan (POS) dan website ke dalam satu kebenaran tunggal secara real-time.",
    impact: "Kenaikan rata-rata nilai pesanan (AOV) sebesar 22% dan peningkatan retensi pelanggan sebesar 30%.",
    category: "Retail",
    aspectRatio: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "TypeScript" }, { name: "Next.js" }, { name: "Node.js" }, { name: "PostgreSQL" }, { name: "Stripe" }
    ],
    features: ["Sinkronisasi inventori", "Personalisasi AI", "Unified checkout", "Analitik omnichannel"],
    year: "2024",
    client: "RetailMax Group",
    status: "Selesai"
  },
  {
    id: 9,
    slug: "deepcore-dataops",
    title: "DeepCore DataOps",
    description: "Otomatisasi alur kerja data skala besar untuk meningkatkan produktivitas tim.",
    longDescription: "DeepCore DataOps mengotomatisasi seluruh siklus hidup data — dari ingesti, transformasi, hingga penyajian.",
    challenge: "Tim data menghabiskan 80% waktu mereka hanya untuk pembersihan dan penataan data daripada melakukan analisis berharga.",
    solution: "Implementasi pipeline DataOps otomatis dengan pengujian kualitas data bawaan (built-in data quality tests) dan orkestrasi workflow yang dapat dipantau (observable).",
    impact: "Pengurangan waktu penyediaan data dari hitungan hari menjadi menit, meningkatkan kecepatan rilis produk berbasis data sebesar 50%.",
    category: "DevOps",
    aspectRatio: "aspect-square",
    image: "https://images.unsplash.com/photo-1504868584819-f8e90ece2cd1?auto=format&fit=crop&q=80&w=1200",
    techStack: [
      { name: "Python" }, { name: "Apache Airflow" }, { name: "dbt" }, { name: "Snowflake" }, { name: "React" }
    ],
    features: ["Pipeline low-code", "Data quality monitoring", "100+ Integrasi sumber data", "70% dev reduction"],
    year: "2025",
    client: "DataFlow Labs",
    status: "Aktif"
  },
];
