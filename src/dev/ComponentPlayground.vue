<script setup>
import { ref, computed } from "vue";

import BaseButton from "@/components/common/BaseButton.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";
import BaseTextarea from "@/components/common/BaseTextarea.vue";
import BaseCard from "@/components/common/BaseCard.vue";
import BaseModal from "@/components/common/BaseModal.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";
import BaseAlert from "@/components/common/BaseAlert.vue";
import BaseTable from "@/components/common/BaseTable.vue";
import BasePagination from "@/components/common/BasePagination.vue";
import BaseSearch from "@/components/common/BaseSearch.vue";
import BaseDropdown from "@/components/common/BaseDropdown.vue";
import BaseTabs from "@/components/common/BaseTabs.vue";
import BaseCheckbox from "@/components/common/BaseCheckbox.vue";
import BaseRadio from "@/components/common/BaseRadio.vue";
import BaseBreadcrumb from "@/components/common/BaseBreadcrumb.vue";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import BaseEmptyState from "@/components/common/BaseEmptyState.vue";

const variants = ["primary", "secondary", "outline", "ghost", "danger"];
const sizes = ["sm", "md", "lg"];

const name = ref("");
const email = ref("");
const password = ref("");
const studentNumber = ref("");
const errorValue = ref("");
const readonlyValue = ref("Data hanya bisa dibaca");
const disabledValue = ref("Input dinonaktifkan");

const selectedClass = ref("");
const selectedGender = ref("");
const selectedPayment = ref("");

const classes = [
  { label: "X RPL 1", value: "x-rpl-1" },
  { label: "X RPL 2", value: "x-rpl-2" },
  { label: "XI RPL 1", value: "xi-rpl-1" },
  { label: "XI RPL 2", value: "xi-rpl-2" },
];

const genders = [
  { label: "Laki-laki", value: "male" },
  { label: "Perempuan", value: "female" },
];

const paymentStatuses = [
  { label: "Lunas", value: "paid" },
  { label: "Belum Lunas", value: "unpaid" },
  { label: "Menunggu Konfirmasi", value: "pending" },
];

const description = ref("");
const address = ref("");
const notes = ref("");
const disabledNotes = ref("Catatan ini tidak dapat diubah.");

const isModalOpen = ref(false);
const isConfirmationOpen = ref(false);

const showDismissibleAlert = ref(true);

const tableLoading = ref(false);
const showEmptyTable = ref(false);

const studentColumns = [
  { key: "nisn", label: "NISN", width: "130px" },
  { key: "name", label: "Nama Siswa" },
  { key: "class", label: "Kelas", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "action", label: "Aksi", align: "center" },
];

const studentRows = [
  {
    id: 1,
    nisn: "0091234567",
    name: "Andi Pratama",
    class: "XI RPL 1",
    status: "Aktif",
  },
  {
    id: 2,
    nisn: "0091234568",
    name: "Budi Santoso",
    class: "XI RPL 2",
    status: "Aktif",
  },
  {
    id: 3,
    nisn: "0091234569",
    name: "Citra Lestari",
    class: "XI RPL 1",
    status: "Nonaktif",
  },
  {
    id: 4,
    nisn: "0091234570",
    name: "Dimas Saputra",
    class: "XI RPL 3",
    status: "Aktif",
  },
];

const emptyRows = [];

const paginationPage = ref(1);
const paginationPerPage = 5;

const paginationStudents = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  nisn: `00912345${String(index + 67).padStart(2, "0")}`,
  name: [
    "Andi Pratama",
    "Budi Santoso",
    "Citra Lestari",
    "Dimas Saputra",
    "Eka Putri",
    "Fajar Ramadhan",
    "Gita Permata",
    "Hendra Wijaya",
    "Indah Sari",
    "Joko Firmansyah",
    "Karin Amelia",
    "Lukman Hakim",
    "Maya Safitri",
    "Nanda Putra",
    "Oki Prasetyo",
    "Putri Anggraini",
    "Rizky Maulana",
    "Salsa Nabila",
    "Tegar Setiawan",
    "Vina Maharani",
  ][index],
  class: `XI RPL ${(index % 3) + 1}`,
  status: index % 4 === 0 ? "Nonaktif" : "Aktif",
}));

const paginationColumns = [
  { key: "nisn", label: "NISN" },
  { key: "name", label: "Nama Siswa" },
  { key: "class", label: "Kelas", align: "center" },
  { key: "status", label: "Status", align: "center" },
];

const paginatedStudents = computed(() => {
  const start = (paginationPage.value - 1) * paginationPerPage;

  return paginationStudents.slice(start, start + paginationPerPage);
});

function handlePageChange(page) {
  console.log("Halaman aktif:", page);
}

const searchKeyword = ref("");
const searchSubmitted = ref("");

const searchSizes = ["sm", "md", "lg"];

const searchStudents = [
  { id: 1, nisn: "0091234567", name: "Andi Pratama", class: "XI RPL 1" },
  { id: 2, nisn: "0091234568", name: "Budi Santoso", class: "XI RPL 2" },
  { id: 3, nisn: "0091234569", name: "Citra Lestari", class: "XI RPL 1" },
  { id: 4, nisn: "0091234570", name: "Dimas Saputra", class: "XI RPL 3" },
  { id: 5, nisn: "0091234571", name: "Eka Putri", class: "XI RPL 2" },
];

const filteredSearchStudents = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();

  if (!keyword) return searchStudents;

  return searchStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(keyword) ||
      student.nisn.includes(keyword),
  );
});

function handleStudentSearch(value) {
  searchSubmitted.value = value;
  console.log("Pencarian siswa:", value);
}

const selectedFilter = ref("all");
const selectedAction = ref(null);
const selectedProfileAction = ref(null);

const filterOptions = [
  { label: "Semua Status", value: "all" },
  { label: "Aktif", value: "active" },
  { label: "Nonaktif", value: "inactive" },
  { label: "Menunggu Verifikasi", value: "pending" },
];

const studentActionOptions = [
  { label: "Lihat Detail", value: "detail" },
  { label: "Edit Data", value: "edit" },
  { divider: true },
  { label: "Hapus Data", value: "delete", variant: "danger" },
];

const profileOptions = [
  { label: "Profil Saya", value: "profile" },
  { label: "Pengaturan", value: "settings" },
  { divider: true },
  { label: "Logout", value: "logout", variant: "danger" },
];

function handleDropdownAction(option) {
  selectedAction.value = option.value;
  console.log("Aksi dipilih:", option.value);
}

const activeStudentTab = ref("biodata");
const activeOrderTab = ref("all");

const studentTabs = [
  { label: "Biodata", value: "biodata" },
  { label: "Akademik", value: "academic" },
  { label: "Keuangan", value: "finance" },
  { label: "Kehadiran", value: "attendance" },
];

const orderTabs = [
  { label: "Semua", value: "all", count: 12 },
  { label: "Draft", value: "draft", count: 2 },
  { label: "Diproses", value: "processing", count: 5 },
  { label: "Siap Diambil", value: "ready", count: 5 },
];

const variantTabs = [
  { label: "Umum", value: "general" },
  { label: "Pengaturan", value: "settings" },
  { label: "Riwayat", value: "history", disabled: true },
];

const termsAccepted = ref(false);

const selectedSubjects = ref(["matematika"]);

const subjectOptions = [
  { label: "Matematika", value: "matematika" },
  { label: "Bahasa Indonesia", value: "bahasa-indonesia" },
  { label: "Bahasa Inggris", value: "bahasa-inggris" },
  { label: "Pemrograman Web", value: "pemrograman-web" },
];

const selectedProducts = ref(["buku"]);

const productOptions = [
  { label: "Buku Tulis", value: "buku" },
  { label: "Seragam Sekolah", value: "seragam" },
  { label: "Alat Tulis", value: "alat-tulis" },
];

const selectedPickup = ref("");

const genderOptions = [
  { label: "Laki-laki", value: "male" },
  { label: "Perempuan", value: "female" },
];

const paymentOptions = [
  {
    label: "Transfer Bank",
    value: "transfer",
    description: "Pembayaran melalui rekening bank.",
  },
  {
    label: "Tunai",
    value: "cash",
    description: "Pembayaran langsung di sekolah.",
  },
  {
    label: "E-Wallet",
    value: "ewallet",
    description: "Pembayaran melalui dompet digital.",
  },
];

const pickupOptions = [
  { label: "Ambil di Koperasi", value: "koperasi" },
  { label: "Pengambilan oleh Wali", value: "wali" },
];

const breadcrumbItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Akademik", to: "/dashboard" },
  { label: "Data Siswa" },
];

const alternativeBreadcrumbItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Koperasi", to: "/dashboard" },
  { label: "Pesanan", to: "/dashboard" },
  { label: "Detail Pesanan" },
];
</script>

<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="mx-auto max-w-5xl space-y-10">
      <header>
        <h1 class="text-2xl font-bold text-gray-900">Component Playground</h1>
        <p class="mt-2 text-sm text-gray-500">
          Preview dan pengujian komponen umum School Portal.
        </p>
      </header>

      <!-- BUTTON -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Button Variants</h2>

        <div class="flex flex-wrap items-center gap-3">
          <BaseButton
            v-for="variant in variants"
            :key="variant"
            :variant="variant"
          >
            {{ variant }}
          </BaseButton>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Button Sizes</h2>

        <div class="flex flex-wrap items-center gap-3">
          <BaseButton v-for="size in sizes" :key="size" :size="size">
            {{ size }}
          </BaseButton>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Button States</h2>

        <div class="flex flex-wrap items-center gap-3">
          <BaseButton disabled>Disabled</BaseButton>
          <BaseButton loading>Loading</BaseButton>
          <BaseButton variant="danger">Hapus Data</BaseButton>
          <BaseButton variant="outline" pill>Pill Button</BaseButton>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Block Button</h2>
        <BaseButton block>Login ke Portal</BaseButton>
      </section>

      <!-- INPUT -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Input Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian berbagai tipe dan kondisi input.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <BaseInput
            v-model="name"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            hint="Isi sesuai nama pada data siswa."
            required
          />

          <BaseInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="nama@email.com"
          />

          <BaseInput
            v-model="password"
            label="Password"
            type="password"
            placeholder="Masukkan password"
          />

          <BaseInput
            v-model="studentNumber"
            label="NISN"
            type="number"
            placeholder="Masukkan NISN"
            size="sm"
          />

          <BaseInput
            v-model="errorValue"
            label="Input dengan Error"
            placeholder="Masukkan data"
            error="Data ini wajib diperbaiki."
          />

          <BaseInput v-model="readonlyValue" label="Readonly" readonly />

          <BaseInput v-model="disabledValue" label="Disabled" disabled />

          <BaseInput
            v-model="name"
            label="Input ukuran Large"
            size="lg"
            placeholder="Ukuran large"
          />
        </div>
      </section>

      <!-- V-MODEL TEST -->
      <section class="space-y-3">
        <h2 class="text-lg font-semibold">V-Model Test</h2>

        <div class="rounded-lg border border-gray-200 bg-white p-4 text-sm">
          <p>Nama: {{ name || "-" }}</p>
          <p>Email: {{ email || "-" }}</p>
          <p>Password: {{ password ? "Terisi" : "Kosong" }}</p>
        </div>
      </section>

      <!-- SELECT COMPONENTS -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Select Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian dropdown untuk berbagai kebutuhan portal.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <BaseSelect
            v-model="selectedClass"
            label="Kelas"
            placeholder="Pilih kelas"
            :options="classes"
            hint="Pilih kelas siswa."
            required
          />

          <BaseSelect
            v-model="selectedGender"
            label="Jenis Kelamin"
            placeholder="Pilih jenis kelamin"
            :options="genders"
          />

          <BaseSelect
            v-model="selectedPayment"
            label="Status Pembayaran"
            placeholder="Pilih status"
            :options="paymentStatuses"
            size="lg"
          />

          <BaseSelect
            label="Select dengan Error"
            placeholder="Pilih kelas"
            :options="classes"
            error="Kelas wajib dipilih."
          />
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-semibold">Select V-Model Test</h2>

        <div class="rounded-lg border border-gray-200 bg-white p-4 text-sm">
          <p>Kelas: {{ selectedClass || "-" }}</p>
          <p>Jenis Kelamin: {{ selectedGender || "-" }}</p>
          <p>Status Pembayaran: {{ selectedPayment || "-" }}</p>
        </div>
      </section>

      <!-- TEXTAREA COMPONENTS -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Textarea Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian input teks panjang untuk berbagai kebutuhan portal.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <BaseTextarea
            v-model="description"
            label="Deskripsi"
            placeholder="Masukkan deskripsi..."
            hint="Tuliskan deskripsi secara lengkap."
            :rows="4"
            required
          />

          <BaseTextarea
            v-model="address"
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap siswa..."
            :rows="4"
            maxlength="250"
          />

          <BaseTextarea
            v-model="notes"
            label="Catatan Pembayaran"
            placeholder="Masukkan catatan pembayaran..."
            :rows="3"
            error="Catatan pembayaran wajib diperiksa."
          />

          <BaseTextarea
            v-model="disabledNotes"
            label="Textarea Disabled"
            disabled
          />

          <BaseTextarea
            v-model="description"
            label="Textarea Readonly"
            readonly
          />
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-lg font-semibold">Textarea V-Model Test</h2>

        <div class="rounded-lg border border-gray-200 bg-white p-4 text-sm">
          <p>Deskripsi: {{ description || "-" }}</p>
          <p>Alamat: {{ address || "-" }}</p>
          <p>Catatan: {{ notes || "-" }}</p>
        </div>
      </section>

      <!-- CARD COMPONENTS -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Card Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian variasi kartu untuk kebutuhan School Portal.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <!-- Default Card -->
          <BaseCard>
            <template #header>
              <h3 class="font-semibold">Informasi Siswa</h3>
            </template>

            <div class="space-y-2 text-sm text-gray-600">
              <p>Nama: Reyvanno</p>
              <p>Kelas: XI RPL 1</p>
              <p>Status: Siswa Aktif</p>
            </div>

            <template #footer>
              <p class="text-xs text-gray-500">Terakhir diperbarui hari ini</p>
            </template>
          </BaseCard>

          <!-- Card with Actions -->
          <BaseCard shadow>
            <template #header>
              <h3 class="font-semibold">Tagihan SPP</h3>
            </template>

            <template #actions>
              <BaseButton size="sm" variant="outline"> Detail </BaseButton>
            </template>

            <div class="space-y-2">
              <p class="text-2xl font-bold text-gray-900">Rp500.000</p>
              <p class="text-sm text-gray-500">Tagihan bulan November</p>
            </div>

            <template #footer>
              <BaseButton block size="sm"> Bayar Sekarang </BaseButton>
            </template>
          </BaseCard>

          <!-- Hover Card -->
          <BaseCard hover padding="lg">
            <h3 class="font-semibold">Katalog Koperasi</h3>
            <p class="mt-2 text-sm text-gray-500">
              Kartu dengan efek hover dan padding large.
            </p>
          </BaseCard>

          <!-- Borderless Card -->
          <BaseCard :bordered="false" shadow radius="xl">
            <h3 class="font-semibold">Dashboard Ringkasan</h3>
            <p class="mt-2 text-sm text-gray-500">
              Kartu tanpa border dengan bayangan dan radius besar.
            </p>
          </BaseCard>
        </div>
      </section>

      <!-- MODAL COMPONENTS -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Modal Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian modal untuk berbagai kebutuhan portal.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <BaseButton @click="isModalOpen = true"> Buka Modal </BaseButton>

          <BaseButton variant="danger" @click="isConfirmationOpen = true">
            Konfirmasi Hapus
          </BaseButton>
        </div>

        <!-- General Modal -->
        <BaseModal v-model="isModalOpen" title="Informasi Siswa" width="md">
          <div class="space-y-3 text-sm text-gray-600">
            <p>Nama: Reyvanno</p>
            <p>Kelas: XI RPL 1</p>
            <p>Status: Siswa Aktif</p>
          </div>

          <template #footer>
            <BaseButton variant="secondary" @click="isModalOpen = false">
              Tutup
            </BaseButton>

            <BaseButton @click="isModalOpen = false"> Mengerti </BaseButton>
          </template>
        </BaseModal>

        <!-- Confirmation Modal -->
        <BaseModal
          v-model="isConfirmationOpen"
          title="Konfirmasi Penghapusan"
          width="sm"
          :close-on-overlay="false"
        >
          <p class="text-sm text-gray-600">
            Apakah kamu yakin ingin menghapus data siswa ini? Tindakan ini tidak
            dapat dibatalkan.
          </p>

          <template #footer>
            <BaseButton variant="secondary" @click="isConfirmationOpen = false">
              Batal
            </BaseButton>

            <BaseButton variant="danger" @click="isConfirmationOpen = false">
              Hapus
            </BaseButton>
          </template>
        </BaseModal>
      </section>

      <!-- BADGE COMPONENTS -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Badge Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian label status untuk School Portal.
          </p>
        </div>

        <div class="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <div class="flex flex-wrap items-center gap-3">
            <BaseBadge variant="primary">Primary</BaseBadge>
            <BaseBadge variant="secondary">Secondary</BaseBadge>
            <BaseBadge variant="success">Success</BaseBadge>
            <BaseBadge variant="warning">Warning</BaseBadge>
            <BaseBadge variant="danger">Danger</BaseBadge>
            <BaseBadge variant="info">Info</BaseBadge>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <BaseBadge size="sm" variant="success">Small</BaseBadge>
            <BaseBadge size="md" variant="success">Medium</BaseBadge>
            <BaseBadge size="lg" variant="success">Large</BaseBadge>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <BaseBadge variant="success" pill dot>Aktif</BaseBadge>
            <BaseBadge variant="warning" pill dot>Menunggu</BaseBadge>
            <BaseBadge variant="info" pill dot>Diproses</BaseBadge>
            <BaseBadge variant="danger" pill dot>Nonaktif</BaseBadge>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Alert Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian notifikasi untuk berbagai kondisi pada School Portal.
          </p>
        </div>

        <div class="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Success -->
          <BaseAlert variant="success" title="Pembayaran berhasil">
            Pembayaran SPP berhasil diverifikasi oleh admin.
          </BaseAlert>

          <!-- Warning -->
          <BaseAlert variant="warning" title="Menunggu verifikasi">
            Bukti pembayaran sedang diperiksa oleh pihak sekolah.
          </BaseAlert>

          <!-- Danger -->
          <BaseAlert variant="danger" title="Gagal menyimpan data">
            Terjadi kesalahan ketika menyimpan data siswa. Silakan coba kembali.
          </BaseAlert>

          <!-- Info -->
          <BaseAlert variant="info" title="Informasi jadwal">
            Jadwal pelajaran telah diperbarui oleh pihak akademik.
          </BaseAlert>

          <!-- Dismissible -->
          <div class="border-t border-gray-200 pt-4">
            <p class="mb-3 text-sm font-medium text-gray-700">
              Pengujian tombol tutup
            </p>

            <BaseAlert
              v-if="showDismissibleAlert"
              variant="success"
              title="Notifikasi dapat ditutup"
              dismissible
              @dismiss="showDismissibleAlert = false"
            >
              Klik tombol silang untuk menutup notifikasi ini.
            </BaseAlert>

            <button
              v-else
              type="button"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              @click="showDismissibleAlert = true"
            >
              Tampilkan Kembali
            </button>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Table Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian tabel dinamis untuk data School Portal.
          </p>
        </div>

        <div class="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Table Controls -->
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              @click="tableLoading = !tableLoading"
            >
              {{ tableLoading ? "Matikan Loading" : "Uji Loading" }}
            </button>

            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              @click="showEmptyTable = !showEmptyTable"
            >
              {{ showEmptyTable ? "Tampilkan Data" : "Uji Data Kosong" }}
            </button>
          </div>

          <!-- Student Table -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-800">Data Siswa</h3>

            <BaseTable
              :columns="studentColumns"
              :rows="showEmptyTable ? emptyRows : studentRows"
              row-key="id"
              :loading="tableLoading"
              empty-text="Tidak ada data siswa yang ditemukan."
              min-width="750px"
            >
              <template #cell-status="{ value }">
                <BaseBadge
                  :variant="value === 'Aktif' ? 'success' : 'danger'"
                  pill
                >
                  {{ value }}
                </BaseBadge>
              </template>

              <template #cell-action="{ row }">
                <button
                  type="button"
                  class="text-sm font-medium text-blue-600 hover:text-blue-800"
                  @click="console.log('Detail siswa:', row)"
                >
                  Detail
                </button>
              </template>
            </BaseTable>
          </div>

          <!-- Alignment Test -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Pengujian Alignment
            </h3>

            <BaseTable
              :columns="[
                { key: 'name', label: 'Nama', align: 'left' },
                { key: 'class', label: 'Kelas', align: 'center' },
                { key: 'score', label: 'Nilai', align: 'right' },
              ]"
              :rows="[
                { id: 1, name: 'Andi Pratama', class: 'XI RPL 1', score: 90 },
                { id: 2, name: 'Budi Santoso', class: 'XI RPL 2', score: 85 },
              ]"
              min-width="450px"
            />
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Pagination Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian navigasi halaman untuk data School Portal.
          </p>
        </div>

        <div class="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
          <div>
            <h3 class="mb-3 text-sm font-semibold text-gray-800">Data Siswa</h3>

            <BaseTable
              :columns="paginationColumns"
              :rows="paginatedStudents"
              row-key="id"
              min-width="600px"
            >
              <template #cell-status="{ value }">
                <BaseBadge
                  :variant="value === 'Aktif' ? 'success' : 'danger'"
                  pill
                >
                  {{ value }}
                </BaseBadge>
              </template>
            </BaseTable>
          </div>

          <BasePagination
            v-model="paginationPage"
            :total-items="paginationStudents.length"
            :per-page="paginationPerPage"
            :sibling-count="1"
            @page-change="handlePageChange"
          />

          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-500">
              Halaman aktif:
              <strong class="text-blue-600">{{ paginationPage }}</strong>
              dari
              <strong>{{
                Math.ceil(paginationStudents.length / paginationPerPage)
              }}</strong>
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Search Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian komponen pencarian untuk berbagai modul School Portal.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Search Sizes -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-800">Variasi Ukuran</h3>

            <BaseSearch
              v-for="size in searchSizes"
              :key="size"
              :size="size"
              :placeholder="`Pencarian ukuran ${size}...`"
            />
          </div>

          <!-- Functional Search -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Pencarian Data Siswa
            </h3>

            <BaseSearch
              v-model="searchKeyword"
              placeholder="Cari nama atau NISN siswa..."
              @search="handleStudentSearch"
            />

            <p class="text-xs text-gray-500">
              Ketik nama atau NISN untuk memfilter data. Tekan Enter untuk
              mengirim pencarian.
            </p>

            <div class="overflow-hidden rounded-lg border border-gray-200">
              <div
                v-for="student in filteredSearchStudents"
                :key="student.id"
                class="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 last:border-b-0"
              >
                <div>
                  <p class="text-sm font-medium text-gray-800">
                    {{ student.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ student.nisn }}
                  </p>
                </div>

                <span class="text-xs text-gray-500">
                  {{ student.class }}
                </span>
              </div>

              <div
                v-if="filteredSearchStudents.length === 0"
                class="px-4 py-8 text-center text-sm text-gray-500"
              >
                Data siswa tidak ditemukan.
              </div>
            </div>

            <p class="text-xs text-gray-500">
              Hasil: {{ filteredSearchStudents.length }} siswa ditemukan.
            </p>

            <p class="text-xs text-gray-500">
              Pencarian terakhir:
              <strong>{{ searchSubmitted || "Belum ada pencarian" }}</strong>
            </p>
          </div>

          <!-- Clearable Search -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Pengujian Clear dan Disabled
            </h3>

            <BaseSearch
              model-value="Contoh pencarian"
              placeholder="Pencarian..."
              disabled
            />

            <BaseSearch
              model-value="Data yang bisa dihapus"
              placeholder="Pencarian..."
              clearable
            />
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Dropdown Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian menu pilihan dan tindakan pada School Portal.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Filter Dropdown -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-800">
              Filter Status Siswa
            </h3>

            <BaseDropdown
              v-model="selectedFilter"
              :options="filterOptions"
              placeholder="Pilih status"
            />

            <p class="text-xs text-gray-500">
              Filter terpilih:
              <strong>{{ selectedFilter }}</strong>
            </p>
          </div>

          <!-- Action Dropdown -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">Menu Aksi Siswa</h3>

            <BaseDropdown
              :options="studentActionOptions"
              placeholder="Pilih tindakan"
              @select="handleDropdownAction"
            />

            <p class="text-xs text-gray-500">
              Aksi terakhir:
              <strong>{{ selectedAction || "Belum ada aksi" }}</strong>
            </p>
          </div>

          <!-- Profile Dropdown -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Menu Profil Pengguna
            </h3>

            <BaseDropdown
              v-model="selectedProfileAction"
              :options="profileOptions"
              placeholder="Menu profil"
              align="right"
            />
          </div>

          <!-- Sizes -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">Variasi Ukuran</h3>

            <div class="flex flex-wrap items-start gap-3">
              <BaseDropdown
                size="sm"
                :options="filterOptions"
                placeholder="Small"
              />

              <BaseDropdown
                size="md"
                :options="filterOptions"
                placeholder="Medium"
              />

              <BaseDropdown
                size="lg"
                :options="filterOptions"
                placeholder="Large"
              />
            </div>
          </div>

          <!-- Disabled -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Kondisi Disabled
            </h3>

            <BaseDropdown
              :options="filterOptions"
              placeholder="Dropdown dinonaktifkan"
              disabled
            />
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Tabs Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian navigasi tab untuk berbagai modul School Portal.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Underline Tabs -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-800">
              Underline Tabs - Detail Siswa
            </h3>

            <BaseTabs
              v-model="activeStudentTab"
              :tabs="studentTabs"
              variant="underline"
            />

            <div
              :id="`tab-panel-${activeStudentTab}`"
              role="tabpanel"
              class="rounded-lg bg-gray-50 p-5"
            >
              <template v-if="activeStudentTab === 'biodata'">
                <p class="font-semibold text-gray-800">Biodata Siswa</p>
                <p class="mt-1 text-sm text-gray-500">
                  Informasi pribadi, NISN, nama, dan kelas siswa.
                </p>
              </template>

              <template v-else-if="activeStudentTab === 'academic'">
                <p class="font-semibold text-gray-800">Informasi Akademik</p>
                <p class="mt-1 text-sm text-gray-500">
                  Informasi nilai, mata pelajaran, dan prestasi siswa.
                </p>
              </template>

              <template v-else-if="activeStudentTab === 'finance'">
                <p class="font-semibold text-gray-800">Informasi Keuangan</p>
                <p class="mt-1 text-sm text-gray-500">
                  Riwayat pembayaran dan tagihan SPP siswa.
                </p>
              </template>

              <template v-else>
                <p class="font-semibold text-gray-800">Informasi Kehadiran</p>
                <p class="mt-1 text-sm text-gray-500">
                  Rekap kehadiran dan riwayat absensi siswa.
                </p>
              </template>
            </div>

            <p class="text-xs text-gray-500">
              Tab aktif: <strong>{{ activeStudentTab }}</strong>
            </p>
          </div>

          <!-- Pills Tabs -->
          <div class="space-y-4 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Pills Tabs - Status Pesanan
            </h3>

            <BaseTabs
              v-model="activeOrderTab"
              :tabs="orderTabs"
              variant="pills"
            />

            <div class="rounded-lg border border-gray-200 p-4">
              <p class="text-sm font-semibold text-gray-800">
                {{
                  orderTabs.find((tab) => tab.value === activeOrderTab)?.label
                }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                Menampilkan daftar pesanan dengan status
                {{ activeOrderTab }}.
              </p>
            </div>
          </div>

          <!-- Disabled Tabs -->
          <div class="space-y-4 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Pengujian Disabled Tabs
            </h3>

            <BaseTabs
              v-model="activeDisabledTab"
              :tabs="variantTabs"
              variant="underline"
            />
          </div>

          <!-- Size Tabs -->
          <div class="space-y-4 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">Variasi Ukuran</h3>

            <BaseTabs
              v-model="activeSmallTab"
              :tabs="variantTabs"
              size="sm"
              variant="pills"
            />

            <BaseTabs
              v-model="activeMediumTab"
              :tabs="variantTabs"
              size="md"
              variant="pills"
            />
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Checkbox Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian input pilihan untuk berbagai kebutuhan School Portal.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Single Checkbox -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-800">Single Checkbox</h3>

            <BaseCheckbox
              v-model="termsAccepted"
              label="Saya menyetujui syarat dan ketentuan sekolah."
              description="Persetujuan ini merupakan simulasi untuk pengujian komponen."
            />

            <p class="text-xs text-gray-500">
              Status:
              <strong>{{
                termsAccepted ? "Disetujui" : "Belum disetujui"
              }}</strong>
            </p>
          </div>

          <!-- Multiple Checkbox -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Multiple Checkbox - Mata Pelajaran
            </h3>

            <div class="space-y-3">
              <BaseCheckbox
                v-for="subject in subjectOptions"
                :key="subject.value"
                v-model="selectedSubjects"
                :value="subject.value"
                :label="subject.label"
              />
            </div>

            <p class="text-xs text-gray-500">
              Mata pelajaran dipilih:
              <strong>{{ selectedSubjects.length }}</strong>
            </p>

            <p class="text-xs text-gray-500">
              {{ selectedSubjects.join(", ") || "Belum ada pilihan" }}
            </p>
          </div>

          <!-- Product Selection -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Pilihan Produk Koperasi
            </h3>

            <div class="space-y-3">
              <BaseCheckbox
                v-for="product in productOptions"
                :key="product.value"
                v-model="selectedProducts"
                :value="product.value"
                :label="product.label"
              />
            </div>

            <p class="text-xs text-gray-500">
              Total produk dipilih:
              <strong>{{ selectedProducts.length }}</strong>
            </p>
          </div>

          <!-- Size Variations -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">Variasi Ukuran</h3>

            <BaseCheckbox size="sm" label="Small" />
            <BaseCheckbox size="md" label="Medium" />
            <BaseCheckbox size="lg" label="Large" />
          </div>

          <!-- Disabled and Indeterminate -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">Kondisi Khusus</h3>

            <BaseCheckbox
              :model-value="true"
              label="Pilihan yang dinonaktifkan"
              disabled
            />

            <BaseCheckbox
              :model-value="false"
              label="Pilihan sebagian (indeterminate)"
              indeterminate
            />
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Radio Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian input pilihan tunggal untuk School Portal.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Gender -->
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-800">Jenis Kelamin</h3>

            <div class="flex flex-wrap gap-5">
              <BaseRadio
                v-for="option in genderOptions"
                :key="option.value"
                v-model="selectedGender"
                name="gender"
                :value="option.value"
                :label="option.label"
              />
            </div>

            <p class="text-xs text-gray-500">
              Pilihan: <strong>{{ selectedGender }}</strong>
            </p>
          </div>

          <!-- Payment -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Metode Pembayaran SPP
            </h3>

            <div class="space-y-4">
              <BaseRadio
                v-for="option in paymentOptions"
                :key="option.value"
                v-model="selectedPayment"
                name="payment"
                :value="option.value"
                :label="option.label"
                :description="option.description"
              />
            </div>

            <p class="text-xs text-gray-500">
              Metode pembayaran: <strong>{{ selectedPayment }}</strong>
            </p>
          </div>

          <!-- Pickup -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Metode Pengambilan Pesanan
            </h3>

            <div class="space-y-3">
              <BaseRadio
                v-for="option in pickupOptions"
                :key="option.value"
                v-model="selectedPickup"
                name="pickup"
                :value="option.value"
                :label="option.label"
              />
            </div>
          </div>

          <!-- Sizes -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">Variasi Ukuran</h3>

            <div class="flex flex-wrap gap-5">
              <BaseRadio
                size="sm"
                name="size-test"
                value="sm"
                model-value="sm"
                label="Small"
              />
              <BaseRadio
                size="md"
                name="size-test"
                value="md"
                model-value="md"
                label="Medium"
              />
              <BaseRadio
                size="lg"
                name="size-test"
                value="lg"
                model-value="lg"
                label="Large"
              />
            </div>
          </div>

          <!-- Disabled -->
          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Kondisi Disabled
            </h3>

            <BaseRadio
              name="disabled-test"
              value="disabled"
              :model-value="null"
              label="Pilihan dinonaktifkan"
              disabled
            />
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Breadcrumb Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian navigasi hierarki halaman School Portal.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-gray-800">
              Breadcrumb Akademik
            </h3>

            <BaseBreadcrumb :items="breadcrumbItems" />

            <div class="rounded-lg bg-gray-50 p-4">
              <h4 class="font-semibold text-gray-800">Data Siswa</h4>
              <p class="mt-1 text-sm text-gray-500">
                Kelola informasi siswa sekolah.
              </p>
            </div>
          </div>

          <div class="space-y-3 border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">
              Breadcrumb Koperasi
            </h3>

            <BaseBreadcrumb :items="alternativeBreadcrumbItems" separator="›" />

            <div class="rounded-lg bg-gray-50 p-4">
              <h4 class="font-semibold text-gray-800">Detail Pesanan</h4>
              <p class="mt-1 text-sm text-gray-500">
                Informasi detail pesanan koperasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Skeleton Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian placeholder loading untuk konten School Portal.
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-5 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-2"
        >
          <!-- Text Skeleton -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-800">Text Skeleton</h3>

            <BaseSkeleton variant="text" height="18px" width="70%" />

            <BaseSkeleton variant="text" height="12px" :count="3" />
          </div>

          <!-- Circular Skeleton -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-800">
              Circular Skeleton
            </h3>

            <div class="flex items-center gap-4">
              <BaseSkeleton variant="circular" />
              <BaseSkeleton variant="circular" width="56px" height="56px" />
              <BaseSkeleton variant="circular" width="72px" height="72px" />
            </div>
          </div>

          <!-- Card Skeleton -->
          <div class="space-y-4 rounded-xl border border-gray-200 p-4">
            <h3 class="text-sm font-semibold text-gray-800">Card Loading</h3>

            <div class="flex items-center gap-3">
              <BaseSkeleton variant="circular" width="48px" height="48px" />

              <div class="flex-1 space-y-2">
                <BaseSkeleton width="65%" height="14px" />
                <BaseSkeleton width="40%" height="11px" />
              </div>
            </div>

            <BaseSkeleton variant="rounded" height="100px" />

            <BaseSkeleton width="80%" height="12px" />
            <BaseSkeleton width="55%" height="12px" />
          </div>

          <!-- Table Skeleton -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold text-gray-800">Table Loading</h3>

            <div class="space-y-3">
              <div
                v-for="index in 4"
                :key="index"
                class="flex items-center gap-3"
              >
                <BaseSkeleton variant="circular" width="32px" height="32px" />

                <div class="flex-1 space-y-2">
                  <BaseSkeleton width="75%" height="12px" />
                  <BaseSkeleton width="45%" height="10px" />
                </div>

                <BaseSkeleton variant="rounded" width="55px" height="22px" />
              </div>
            </div>
          </div>

          <!-- Animation Variations -->
          <div class="space-y-4 border-t border-gray-200 pt-5 md:col-span-2">
            <h3 class="text-sm font-semibold text-gray-800">Variasi Animasi</h3>

            <div class="space-y-4">
              <div class="space-y-2">
                <p class="text-xs text-gray-500">Pulse</p>
                <BaseSkeleton animation="pulse" height="16px" />
              </div>

              <div class="space-y-2">
                <p class="text-xs text-gray-500">Wave</p>
                <BaseSkeleton animation="wave" height="16px" />
              </div>

              <div class="space-y-2">
                <p class="text-xs text-gray-500">None</p>
                <BaseSkeleton animation="none" height="16px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- EMPTY STATE COMPONENTS -->
      <section class="space-y-5">
        <div>
          <h2 class="text-lg font-semibold">Empty State Components</h2>
          <p class="text-sm text-gray-500">
            Pengujian tampilan ketika data belum tersedia.
          </p>
        </div>

        <div class="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
          <!-- Default -->
          <div class="space-y-2">
            <h3 class="text-sm font-semibold text-gray-800">Default</h3>

            <BaseEmptyState
              title="Belum ada data siswa"
              description="Data siswa akan ditampilkan setelah tersedia."
            />
          </div>

          <!-- With Icon -->
          <div class="border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">With Icon</h3>

            <BaseEmptyState
              title="Tidak ada hasil pencarian"
              description="Coba gunakan kata kunci pencarian yang berbeda."
            >
              <template #icon>
                <span aria-hidden="true">🔍</span>
              </template>
            </BaseEmptyState>
          </div>

          <!-- With Action -->
          <div class="border-t border-gray-200 pt-5">
            <h3 class="text-sm font-semibold text-gray-800">With Action</h3>

            <BaseEmptyState
              title="Belum ada pesanan"
              description="Mulai belanja produk kebutuhan sekolah di koperasi."
            >
              <template #icon>
                <span aria-hidden="true">🛒</span>
              </template>

              <template #action>
                <BaseButton size="sm"> Lihat Katalog </BaseButton>
              </template>
            </BaseEmptyState>
          </div>

          <!-- Size Variations -->
          <div class="border-t border-gray-200 pt-5">
            <h3 class="mb-3 text-sm font-semibold text-gray-800">
              Size Variations
            </h3>

            <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div class="rounded-lg border border-gray-200">
                <BaseEmptyState
                  size="sm"
                  title="Small"
                  description="Ukuran kecil."
                />
              </div>

              <div class="rounded-lg border border-gray-200">
                <BaseEmptyState
                  size="md"
                  title="Medium"
                  description="Ukuran sedang."
                />
              </div>

              <div class="rounded-lg border border-gray-200">
                <BaseEmptyState
                  size="lg"
                  title="Large"
                  description="Ukuran besar."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
