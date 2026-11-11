<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const auth = useAuthStore()
const displayName = computed(() => auth.user?.name || auth.user?.display_name || auth.user?.login || 'Pengguna')
const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

const stats = [
  { label: 'Informasi akademik', value: '—', note: 'Jadwal dan nilai', icon: '▦', tone: 'blue' },
  { label: 'Status pembayaran', value: '—', note: 'Informasi tagihan SPP', icon: 'Rp', tone: 'orange' },
  { label: 'Kehadiran', value: '—', note: 'Rekap kehadiran siswa', icon: '✓', tone: 'green' },
  { label: 'Pengumuman', value: '—', note: 'Informasi terbaru sekolah', icon: '◉', tone: 'purple' },
]
const shortcuts = [
  { title: 'Jadwal Kelas', description: 'Lihat jadwal pelajaran', icon: '▦' },
  { title: 'Nilai & E-Rapor', description: 'Pantau perkembangan akademik', icon: '▤' },
  { title: 'Keuangan SPP', description: 'Periksa tagihan pembayaran', icon: 'Rp' },
  { title: 'E-Perpus', description: 'Jelajahi layanan perpustakaan', icon: '▣' },
]
</script>

<template>
  <DashboardLayout>
    <section class="welcome-panel">
      <div>
        <span class="welcome-kicker">RINGKASAN PORTAL</span>
        <h2>Selamat datang, {{ displayName }} 👋</h2>
        <p>Berikut ringkasan informasi yang tersedia di School Portal.</p>
        <span class="welcome-date">{{ today }}</span>
      </div>
      <div class="welcome-art" aria-hidden="true"><span>✦</span><strong>SP</strong><i></i></div>
    </section>

    <div class="section-heading">
      <div><h2>Ringkasan informasi</h2><p>Informasi akun dan aktivitas sekolah.</p></div>
      <span class="data-label"><i></i> Menunggu integrasi data</span>
    </div>

    <section class="summary-grid">
      <article v-for="item in stats" :key="item.label" class="summary-card">
        <div class="summary-icon" :class="`summary-icon--${item.tone}`">{{ item.icon }}</div>
        <div><span>{{ item.label }}</span><strong>{{ item.value }}</strong><small>{{ item.note }}</small></div>
      </article>
    </section>

    <section class="section-heading shortcut-heading">
      <div><h2>Akses cepat</h2><p>Pilih layanan sekolah yang ingin kamu buka.</p></div>
    </section>
    <section class="shortcut-grid">
      <article v-for="item in shortcuts" :key="item.title" class="shortcut-card">
        <div class="shortcut-icon">{{ item.icon }}</div>
        <div><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
        <span class="shortcut-arrow">↗</span>
      </article>
    </section>

    <section class="notice-panel">
      <div class="notice-icon">i</div>
      <div><strong>Dashboard sedang dalam tahap integrasi</strong><p>Login dan sesi pengguna sudah terhubung ke Odoo. Data jadwal, nilai, pembayaran, dan layanan lainnya akan ditampilkan setelah endpoint masing-masing modul tersedia.</p></div>
    </section>
  </DashboardLayout>
</template>
