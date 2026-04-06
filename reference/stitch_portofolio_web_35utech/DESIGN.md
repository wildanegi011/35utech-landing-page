# Dokumentasi Sistem Desain: 35utech IT Studio

## 1. Filosofi Desain: "The Precision Architect"
Sistem desain ini dibangun di atas pilar **"The Precision Architect"**. Sebagai studio IT, identitas visual 35utech harus mencerminkan akurasi teknis sekaligus kemudahan akses. Kita menghindari tren desain yang berlebihan (over-designed) untuk mengejar estetika yang abadi, bersih, dan berwibawa.

**Creative North Star:**
*   **Intentional Asymmetry:** Gunakan ruang putih (white space) yang luas dan tidak simetris untuk mengarahkan pandangan pengguna ke area konversi utama.
*   **Editorial Authority:** Tipografi yang berani dan kontras tinggi memberikan kesan bahwa setiap kata memiliki bobot profesional.
*   **Tonal Depth:** Kedalaman diciptakan melalui tumpukan layer warna, bukan garis keras, menciptakan antarmuka yang terasa "organik" namun terstruktur secara digital.

---

## 2. Palet Warna & Aturan Kontras
Warna utama kita, **Electric Blue (#2563EB)**, adalah simbol energi dan kepercayaan teknologi. Namun, rahasia dari tampilan premium terletak pada bagaimana kita memperlakukan area netral.

### Skema Warna Utama (Material 3 Logic)
*   **Primary (`#004ac6`):** Digunakan untuk elemen brand utama.
*   **Primary Container (`#2563eb`):** *Electric Blue* murni untuk aksi utama (CTA).
*   **Surface (`#f7f9fb`):** Warna dasar aplikasi yang memberikan kesan bersih.
*   **Surface Container Lowest (`#ffffff`):** Putih murni untuk kartu atau elemen yang paling "menonjol" ke depan.

### Aturan "No-Line" (Tanpa Garis)
**Dilarang keras** menggunakan border 1px solid hitam atau abu-abu pekat untuk memisahkan konten. Pemisahan visual harus dicapai melalui:
1.  **Background Shifts:** Letakkan elemen di atas `surface-container-low` (`#f2f4f6`) untuk membedakannya dari background utama.
2.  **Tonal Transitions:** Gunakan perubahan warna latar belakang yang sangat halus untuk menciptakan zona informasi.

### Signature Texture
Gunakan gradien halus dari `primary` ke `primary_container` pada tombol utama atau *Hero Section* untuk memberikan dimensi "liquid technology" yang tidak bisa dicapai oleh warna flat.

---

## 3. Tipografi: Kontras Editorial
Kita menggunakan perpaduan antara **Plus Jakarta Sans** yang modern dan geometris dengan **Inter** yang fungsional dan memiliki keterbacaan tinggi.

| Role | Font Family | Size | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **Display LG** | Plus Jakarta Sans | 3.5rem | Bold | -0.04em |
| **Headline MD** | Plus Jakarta Sans | 1.75rem | Bold | -0.02em |
| **Title LG** | Inter | 1.375rem | Medium | 0 |
| **Body LG** | Inter | 1.0rem | Regular | 0 |
| **Label MD** | Inter | 0.75rem | Semi-Bold | +0.02em |

**Panduan Karakter:**
*   **Headings:** Selalu gunakan *tight tracking* (jarak antar huruf yang rapat) untuk memberikan kesan padat dan profesional.
*   **Body:** Gunakan *line-height* yang lega (1.6x - 1.8x) untuk memastikan kenyamanan membaca artikel teknis yang panjang.

---

## 4. Elevasi & Kedalaman (Layering Principle)
Sesuai arahan, kita menghindari *glassmorphism* yang ekstrem demi kejernihan (clarity). Kedalaman dicapai melalui teknik **Tonal Layering**.

*   **Stacking Principle:** Bayangkan UI sebagai tumpukan kertas premium. Gunakan `surface-container-highest` (`#e0e3e5`) sebagai dasar, lalu letakkan `surface-container-lowest` (`#ffffff`) sebagai kartu di atasnya. Kontras antara abu-abu sangat muda dan putih murni ini menciptakan efek "angkat" yang elegan tanpa bayangan.
*   **Ambient Shadows:** Jika bayangan diperlukan (misal: pada tombol melayang), gunakan bayangan dengan *blur* besar (20px - 40px) dan opasitas sangat rendah (4%-6%) menggunakan warna `on-surface` yang di-tint biru.
*   **Ghost Borders:** Untuk elemen input, gunakan `outline-variant` (`#c3c6d7`) dengan opasitas 20%. Border harus terasa seperti "bayangan garis", bukan kurungan fisik.

---

## 5. Komponen Utama

### Buttons (Tombol)
*   **Primary:** Latar belakang `primary_container` dengan teks `on_primary_container`. Gunakan radius 8px (`0.5rem`). Tambahkan gradien linier halus dari atas ke bawah untuk efek premium.
*   **Secondary:** Tanpa latar belakang, hanya teks `primary` dengan *Ghost Border* yang sangat halus.

### Cards (Kartu)
*   **Strict Rule:** Dilarang menggunakan garis pemisah (*divider*). Gunakan ruang vertikal (misal: 24px atau 32px) untuk memisahkan grup informasi.
*   **Interactive State:** Saat di-hover, kartu harus sedikit bergeser ke atas (2-4px) dan bayangan ambient-nya sedikit menebal.

### Input Fields
*   Latar belakang menggunakan `surface-container-low`.
*   Label menggunakan `label-md` dengan warna `on-surface-variant`.
*   Gunakan radius 8px secara konsisten.

---

## 6. Do's and Don'ts

### Do's (Lakukan)
*   **Gunakan Whitespace Secara Agresif:** Ruang kosong adalah kemewahan dalam desain. Biarkan konten bernapas.
*   **Hierarki Visual yang Jelas:** Pastikan `display-lg` hanya digunakan satu kali per halaman (H1).
*   **Aksesibilitas:** Selalu pastikan kontras teks pada latar belakang memenuhi standar WCAG (minimal 4.5:1).

### Don'ts (Jangan Lakukan)
*   **Jangan gunakan Divider Hitam:** Gunakan perubahan warna latar belakang jika butuh pemisah.
*   **Jangan gunakan Radius Tajam:** Hindari sudut 0px; tetap gunakan standar 8px untuk menjaga kesan *user-friendly*.
*   **Jangan gunakan Bayangan Gelap:** Bayangan yang terlalu hitam akan merusak estetika "clean" dan "light" yang ingin kita capai.

---

*Desain ini adalah representasi dari 35utech IT Studio: Presisi, Bersih, dan Visioner.*