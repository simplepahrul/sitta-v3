# SISTEM INFORMASI TIRAS DAN TRANSAKSI BAHAN AJAR (SITTA V3)

Sistem informasi berbasis web untuk simulasi pengelolaan stok bahan ajar, tracking Delivery Order (DO), dan proses transaksi distribusi bahan ajar berbasis Vue.js dengan pendekatan Component-Based Architecture.

---

## 🚀 Live Demo

🔗 https://simplepahrul.github.io/sitta-v3  

---

## 👨‍🎓 Author

**M. Pahrul Amri - 054118657**

---

## 📌 Deskripsi Sistem

SITTA V3 (Sistem Informasi Tiras dan Transaksi Bahan Ajar versi 3) merupakan pengembangan dari SITTA V2 dengan melakukan refactoring besar pada struktur frontend menggunakan Vue.js 3 berbasis komponen.

Pada versi ini, aplikasi tidak lagi ditulis dalam satu instance Vue, melainkan dipecah menjadi komponen-komponen modular yang memiliki tanggung jawab masing-masing untuk meningkatkan maintainability, reusability, dan keteraturan kode.

---

## 🎯 Tujuan Pengembangan

- Mengimplementasikan konsep Vue Component dan Template  
- Memecah aplikasi menjadi komponen modular yang reusable  
- Meningkatkan struktur dan organisasi kode frontend  
- Mengelola alur aplikasi berbasis state-driven UI (login & dashboard)  
- Menerapkan komunikasi antar komponen menggunakan props dan emit  
- Mengambil data dinamis menggunakan JSON dan ApiService (fetch)

---

## ⚙️ Fitur Utama

### 🔐 Autentikasi Login
- Login berbasis data pengguna dummy
- Validasi kredensial menggunakan service
- Redirect ke dashboard setelah login berhasil

---

### 📊 Dashboard SITTA
- Single Page Application (SPA style tanpa routing framework)
- Navigasi berbasis state (Login → Dashboard → Tab Menu)
- Integrasi modul stok dan tracking dalam satu halaman

---

### 📚 Manajemen Stok Bahan Ajar
- CRUD data bahan ajar (Create, Read, Update, Delete)
- Filter dan sorting data stok
- Status stok otomatis:
  - Aman
  - Menipis
  - Kosong
- Sistem reorder berbasis safety stock
- Pencarian data stok

---

### 🚚 Tracking Delivery Order (DO)
- Generate nomor DO otomatis (format DO2025-0001)
- Pencarian berdasarkan Nomor DO atau NIM
- Detail tracking pengiriman
- Riwayat status perjalanan barang
- Event keyboard (Enter untuk search, Esc untuk reset)

---

### 🧩 Vue Component System
Sistem dibangun menggunakan komponen Vue.js berikut:

- `stock-table.js` → manajemen data stok  
- `do-tracking.js` → tracking pengiriman DO  
- `order-form.js` → form pemesanan bahan ajar  
- `status-badge.js` → indikator status stok  
- `app-modal.js` → modal reusable aplikasi  

Komponen saling berkomunikasi menggunakan:
- Props (parent → child)
- Emit (child → parent)

---

### 🎨 UI & UX Enhancement
- Responsive UI menggunakan Bootstrap 5
- Dark mode & light mode
- Modal system reusable
- Interactive table & form validation
- Dashboard berbasis tab state

---

## 🧠 Konsep yang Diimplementasikan

- Vue.js 3 (CDN approach)
- Component-Based Architecture
- Template-based rendering
- Props & Emit communication
- Reactive state management
- Fetch API (JSON data service)
- Modular JavaScript structure
- Single Page Application (SPA style tanpa router)

---

## 📁 Struktur Proyek

> Struktur dapat dilihat pada file `note.txt` dalam repository.

---

## 📊 Perbandingan SITTA V2 vs V3

- Struktur:
  - V2 → Single Vue instance
  - V3 → Component-based architecture

- Organisasi kode:
  - V2 → Monolitik
  - V3 → Modular

- Reusability:
  - V2 → Rendah
  - V3 → Tinggi

- Template:
  - V2 → Inline / mixed
  - V3 → Dipisah per komponen

- Arsitektur:
  - V2 → Basic Vue implementation
  - V3 → Component-based architecture

---

## 🧠 Catatan Pengembangan

SITTA V3 merupakan refactoring dari versi sebelumnya dengan fokus pada:
- Clean architecture frontend
- Pemisahan tanggung jawab komponen
- Struktur kode yang lebih scalable
- Implementasi konsep modern Vue.js (Component & Template system)

---

## 👨‍🎓 Penutup

SITTA V3 diharapkan menjadi representasi implementasi Vue.js berbasis komponen yang lebih terstruktur, modular, dan mendekati praktik pengembangan frontend modern.

---

> “Talk is cheap. Show me the code.”  
> — Linus Torvalds

> “Stay hard.”  
> — David Goggins
