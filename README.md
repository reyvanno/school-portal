# School Portal

Website Portal Sekolah untuk siswa dan orang tua yang menyediakan akses informasi akademik, jadwal pelajaran, pembayaran SPP, koperasi sekolah, dan perpustakaan digital.

Project ini menggunakan Vue.js sebagai frontend dan Odoo sebagai backend.

---

## 1. Teknologi

| Teknologi | Fungsi |
|---|---|
| Vue 3 | Frontend framework |
| Vite | Development server dan build tool |
| Vue Router | Routing halaman |
| Pinia | State management |
| Axios | HTTP client untuk komunikasi API |
| Tailwind CSS v4 | Styling dan utility CSS |
| Odoo 19 | Backend dan pengelolaan data |
| Git & GitHub | Version control dan kolaborasi |

---

## 2. Fitur Website

Fitur utama yang dikembangkan:

- **Dashboard:** Informasi ringkas siswa, jadwal, status SPP, dan pengumuman.
- **Data Siswa:** Informasi dan biodata siswa.
- **Akademik:** Nilai dan E-Rapor.
- **Jadwal:** Jadwal pelajaran dan ruang kelas.
- **Keuangan:** Tagihan SPP dan unggah bukti pembayaran.
- **Koperasi:** Katalog produk, keranjang belanja, dan checkout.
- **Perpustakaan:** Pencarian dan katalog buku.

---

## 3. Instalasi Project

### Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js
- npm
- Git

### Clone Repository

```bash
git clone https://github.com/reyvanno/school-portal.git
```

Masuk ke direktori project:

```bash
cd school-portal
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build untuk production:

```bash
npm run build
```

---

## 4. Konfigurasi Environment

Buat file `.env` di root project.

```env
VITE_API_BASE_URL=/odoo-api
```

Keterangan:

- `VITE_API_BASE_URL` digunakan untuk menentukan alamat dasar API backend.
- Nilai `/odoo-api` merupakan konfigurasi default yang digunakan frontend saat ini.
- Sesuaikan nilainya dengan alamat backend atau reverse proxy yang disediakan tim backend.

Jangan memasukkan password, API secret, atau informasi sensitif ke dalam variabel `VITE_` karena variabel tersebut dapat diakses oleh frontend.

Sediakan `.env.example` sebagai template konfigurasi untuk developer lain. Jangan commit file `.env` yang berisi konfigurasi lokal atau informasi rahasia.

---

## 5. Struktur Folder

```text
src/
├── api/
│   └── client.js
│
├── assets/
│
├── components/
│   ├── common/
│   └── layout/
│
├── composables/
│
├── dev/
│   └── ComponentPlayground.vue
│
├── layouts/
│
├── modules/
│   ├── index.js
│   ├── students/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── academic/
│   ├── schedule/
│   ├── finance/
│   ├── cooperative/
│   └── library/
│
├── pages/
│
├── router/
│   └── index.js
│
├── services/
│   ├── auth.service.js
│   └── connection-test.js
│
├── stores/
│   └── auth.store.js
│
├── styles/
│
└── utils/
```

### Fungsi setiap folder

| Folder | Tanggung jawab |
|---|---|
| `api/` | Konfigurasi Axios dan HTTP client |
| `assets/` | Gambar, ikon, dan aset statis |
| `components/common/` | Komponen reusable seperti button, input, modal, dan table |
| `components/layout/` | Komponen sidebar dan topbar |
| `composables/` | Logic reusable berbasis Composition API |
| `dev/` | Halaman pengujian komponen untuk development |
| `layouts/` | Layout utama aplikasi |
| `modules/` | Pengelompokan fitur berdasarkan domain |
| `pages/` | Halaman global aplikasi |
| `router/` | Konfigurasi Vue Router |
| `services/` | Service global seperti autentikasi |
| `stores/` | State management menggunakan Pinia |
| `styles/` | CSS global dan styling halaman |
| `utils/` | Helper dan fungsi JavaScript umum |

---

## 6. Standar Pengembangan Modul

Setiap fitur memiliki direktori masing-masing di dalam `src/modules/`.

Contoh struktur modul siswa:

```text
modules/
└── students/
    ├── components/
    │   └── StudentCard.vue
    ├── pages/
    │   └── StudentsPage.vue
    ├── services/
    │   └── students.service.js
    └── index.js
```

### Aturan penempatan file

1. Komponen yang hanya digunakan satu modul ditempatkan di `modules/nama-modul/components/`.
2. Komponen yang digunakan lintas fitur ditempatkan di `components/common/`.
3. Halaman utama fitur ditempatkan di `modules/nama-modul/pages/`.
4. Komunikasi API khusus fitur ditempatkan di `modules/nama-modul/services/`.
5. State khusus fitur dapat menggunakan store di dalam modul apabila memang diperlukan.
6. Logic reusable lintas fitur ditempatkan di `composables/`.
7. Helper JavaScript umum ditempatkan di `utils/`.

Hindari membuat komponen atau fungsi duplikat jika sudah tersedia versi reusable.

---

## 7. Standar Routing

Routing global dikelola melalui:

```text
src/router/index.js
```

Pengumpulan route modul dilakukan melalui:

```text
src/modules/index.js
```

Setiap modul bertanggung jawab menyediakan konfigurasi route melalui file `index.js`.

Contoh route pada `modules/students/index.js`:

```javascript
export default [
  {
    path: "/students",
    name: "students",
    component: () => import("./pages/StudentsPage.vue"),
    meta: {
      requiresAuth: true,
      title: "Data Siswa",
    },
  },
];
```

Kemudian daftarkan route modul melalui `src/modules/index.js`:

```javascript
import studentsRoutes from "./students/index.js";

export default [
  ...studentsRoutes,
];
```

Jika modul lain sudah tersedia, tambahkan import dan spread route modul tersebut.

### Aturan routing

- Gunakan nama route yang unik.
- Gunakan lazy loading untuk halaman modul.
- Halaman internal menggunakan `meta.requiresAuth`.
- Halaman khusus pengunjung dapat menggunakan `meta.guestOnly`.
- Hindari mendaftarkan route modul langsung di router utama.
- Jangan mendaftarkan route menuju halaman yang belum dibuat.

---

## 8. Standar Integrasi API Odoo

Frontend menggunakan satu Axios instance:

```text
src/api/client.js
```

Seluruh service harus menggunakan client tersebut.

Contoh:

```javascript
import api from "@/api/client.js";

export async function getStudents() {
  const response = await api.get("/api/v1/students");
  return response.data;
}
```

Contoh di atas merupakan pola penggunaan, bukan konfirmasi bahwa endpoint tersebut sudah tersedia di backend.

### Aturan integrasi

1. Jangan membuat instance Axios baru di setiap service.
2. Gunakan `api/client.js` untuk seluruh request HTTP.
3. Pisahkan request API dari komponen Vue.
4. Gunakan service khusus untuk setiap fitur.
5. Ikuti dokumentasi API yang telah disepakati bersama tim backend.
6. Jangan mengarang endpoint, nama parameter, atau format response.
7. Tangani loading, error, dan empty state pada tampilan.

### Autentikasi

Sistem autentikasi frontend saat ini menggunakan session Odoo dan mekanisme CSRF sesuai rancangan integrasi backend.

Service autentikasi berada di:

```text
src/services/auth.service.js
```

State autentikasi berada di:

```text
src/stores/auth.store.js
```

Detail header CSRF, cookie session, CORS, dan reverse proxy harus mengikuti implementasi backend yang telah dikonfirmasi.

---

## 9. Standar Komponen Reusable

Komponen reusable tersedia di:

```text
src/components/common/
```

Komponen yang tersedia:

- BaseAlert
- BaseBadge
- BaseBreadcrumb
- BaseButton
- BaseCard
- BaseCheckbox
- BaseDropdown
- BaseEmptyState
- BaseInput
- BaseModal
- BasePagination
- BaseRadio
- BaseSearch
- BaseSelect
- BaseSkeleton
- BaseTable
- BaseTabs
- BaseTextarea

Sebelum membuat komponen baru, periksa apakah kebutuhan tersebut sudah dapat dipenuhi oleh komponen yang tersedia.

Gunakan `ComponentPlayground.vue` untuk pengujian komponen selama development.

Route playground:

```text
/dev/components
```

Route ini hanya tersedia ketika aplikasi dijalankan dalam mode development.

---

## 10. Standar Kolaborasi Dua Developer

Setiap developer mengerjakan fitur melalui branch masing-masing.

### Aturan utama

- `main` merupakan branch utama dan harus dijaga tetap stabil.
- Jangan mengerjakan fitur langsung di `main`.
- Gunakan feature branch untuk setiap pekerjaan.
- Lakukan pull dari `main` sebelum memulai pekerjaan baru.
- Jangan mengubah file milik modul lain tanpa koordinasi.
- Gunakan Pull Request sebelum menggabungkan perubahan ke `main`.

### Contoh pembagian branch

```text
main
│
├── feature/students
├── feature/academic
├── feature/schedule
├── feature/finance
├── feature/cooperative
└── feature/library
```

Nama branch dapat disesuaikan dengan pembagian pekerjaan yang telah disepakati.

### Membuat branch baru

```bash
git checkout main
git pull origin main
git checkout -b feature/nama-fitur
```

### Menyimpan perubahan

```bash
git add .
git commit -m "feat(students): add student page"
git push -u origin feature/nama-fitur
```

Gunakan `git add` dengan path spesifik jika terdapat perubahan dari pekerjaan lain yang belum boleh ikut di-commit.

### Pull Request

Setelah branch selesai:

1. Push branch ke GitHub.
2. Buat Pull Request menuju `main`.
3. Jelaskan fitur yang dibuat.
4. Sertakan hasil pengujian.
5. Periksa konflik jika ada.
6. Lakukan review.
7. Merge setelah disetujui.

---

## 11. Standar Commit

Gunakan format Conventional Commits:

```text
type(scope): description
```

Contoh:

```text
feat(students): add student management page
feat(finance): add payment history
fix(auth): handle expired session
refactor(api): centralize axios configuration
style(dashboard): improve responsive layout
docs(readme): update development guidelines
```

Jenis commit yang digunakan:

| Type | Kegunaan |
|---|---|
| `feat` | Menambahkan fitur |
| `fix` | Memperbaiki bug |
| `refactor` | Merapikan kode tanpa mengubah fungsi |
| `style` | Perubahan tampilan atau formatting |
| `docs` | Dokumentasi |
| `test` | Pengujian |
| `chore` | Konfigurasi dan pemeliharaan |

---

## 12. Sebelum Pull Request

Pastikan hal berikut:

- [ ] Fitur berjalan sesuai kebutuhan.
- [ ] Tidak ada error pada browser console.
- [ ] Tidak ada import yang rusak.
- [ ] Tidak ada file sensitif yang ikut di-commit.
- [ ] Tidak mengubah file milik developer lain tanpa koordinasi.
- [ ] Build production berhasil.

Jalankan:

```bash
npm run build
```

---

## 13. Catatan Pengembangan

Project ini dikembangkan secara bertahap dan terintegrasi dengan backend Odoo.

Frontend bertanggung jawab atas:

- Antarmuka pengguna.
- Navigasi dan routing.
- Pengelolaan state frontend.
- Validasi tampilan dan interaksi.
- Komunikasi API sesuai kontrak backend.

Backend bertanggung jawab atas:

- Pengelolaan data.
- Business logic.
- Autentikasi dan otorisasi server.
- Implementasi endpoint API.
- Integrasi database dan modul Odoo.

Setiap perubahan kontrak API harus dikomunikasikan kepada developer frontend dan backend agar integrasi tetap konsisten.

---

**Repository:** https://github.com/reyvanno/school-portal
