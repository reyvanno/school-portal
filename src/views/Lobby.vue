
<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const features = [
  {
    number: '01',
    icon: 'graduation',
    title: 'Akademik',
    description: 'Informasi jadwal pelajaran, nilai, dan perkembangan akademik.',
    tone: 'blue',
  },
  {
    number: '02',
    icon: 'wallet',
    title: 'Tagihan SPP',
    description: 'Informasi tagihan dan status pembayaran sekolah.',
    tone: 'yellow',
  },
  {
    number: '03',
    icon: 'store',
    title: 'Koperasi & E-Kantin',
    description: 'Akses layanan koperasi dan pemesanan kantin sekolah.',
    tone: 'green',
  },
  {
    number: '04',
    icon: 'book',
    title: 'Perpustakaan',
    description: 'Temukan informasi buku dan layanan perpustakaan.',
    tone: 'purple',
  },
  {
    number: '05',
    icon: 'clipboard',
    title: 'Kehadiran & Catatan',
    description: 'Pantau informasi presensi dan catatan siswa.',
    tone: 'orange',
  },
  {
    number: '06',
    icon: 'megaphone',
    title: 'Pengumuman',
    description: 'Ikuti informasi dan kabar terbaru dari sekolah.',
    tone: 'pink',
  },
]

const audiences = [
  { initials: 'AD', name: 'Admin', description: 'Pengelolaan portal' },
  { initials: 'PT', name: 'Petugas', description: 'Layanan operasional' },
  { initials: 'GU', name: 'Guru', description: 'Akademik dan kelas' },
  { initials: 'SW', name: 'Siswa', description: 'Informasi pembelajaran' },
  { initials: 'OT', name: 'Orang Tua', description: 'Informasi anak' },
]
</script>

<template>
  <div class="lobby">
    <header class="lobby-header">
      <a class="lobby-brand" href="#" aria-label="School Portal beranda">
        <span class="lobby-logo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m2 9 10-5 10 5-10 5L2 9Z" />
            <path d="M6 12v5c4 3 8 3 12 0v-5M22 9v6" />
          </svg>
        </span>
        <span class="lobby-brand-copy">
          <strong>School Portal</strong>
          <small>Sekolah Demo</small>
        </span>
      </a>

      <button
        class="lobby-menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Buka navigasi"
        @click="menuOpen = !menuOpen"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <nav class="lobby-nav" :class="{ 'lobby-nav-open': menuOpen }">
        <a href="#beranda" @click="menuOpen = false">Beranda</a>
        <a href="#fitur" @click="menuOpen = false">Fitur</a>
        <a href="#pengguna" @click="menuOpen = false">Pengguna</a>
        <RouterLink class="lobby-login" to="/dashboard" @click="menuOpen = false">
          Login
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </nav>
    </header>

    <main>
      <section id="beranda" class="lobby-hero">
        <div class="hero-copy">
          <div class="hero-eyebrow">
            <span class="eyebrow-dot"></span>
            SATU PORTAL, BANYAK KEMUDAHAN
          </div>

          <h1>
            Sekolah lebih terhubung,
            <span>belajar lebih berkembang.</span>
          </h1>

          <p class="hero-description">
            Kenali School Portal, platform terpadu untuk membantu menghubungkan
            layanan sekolah, informasi akademik, dan kebutuhan komunitas sekolah
            dalam satu tempat.
          </p>

          <div class="hero-actions">
            <a href="#fitur" class="button-primary">
              Jelajahi Fitur
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#pengguna" class="button-secondary">
              Kenali Portal
            </a>
          </div>

          <div class="hero-note">
            <span class="note-check">✓</span>
            Satu platform untuk mendukung aktivitas sekolah
          </div>
        </div>

        <div class="hero-visual" aria-label="Ilustrasi abstrak School Portal">
          <div class="shape shape-circle"></div>
          <div class="shape shape-square"></div>
          <div class="shape shape-orbit"></div>
          <div class="shape shape-dot dot-one"></div>
          <div class="shape shape-dot dot-two"></div>
          <div class="shape shape-dot dot-three"></div>

          <div class="visual-card visual-card-top">
            <span class="visual-icon icon-blue">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m2 9 10-5 10 5-10 5L2 9Z" />
                <path d="M6 12v5c4 3 8 3 12 0v-5" />
              </svg>
            </span>
            <span>
              <strong>Akademik</strong>
              <small>Informasi pembelajaran</small>
            </span>
            <span class="mini-check">✓</span>
          </div>

          <div class="visual-main-card">
            <div class="visual-card-header">
              <div>
                <span class="visual-overline">WELCOME TO</span>
                <h2>School Portal</h2>
              </div>
              <span class="visual-sparkle">✳</span>
            </div>

            <div class="visual-abstract-art">
              <div class="art-ring"></div>
              <div class="art-circle"></div>
              <div class="art-square"></div>
              <div class="art-pill"></div>
              <div class="art-star">✳</div>
            </div>

            <div class="visual-card-bottom">
              <span class="visual-status-dot"></span>
              <span>Terhubung dalam satu ekosistem</span>
            </div>
          </div>

          <div class="visual-card visual-card-bottom">
            <span class="visual-icon icon-green">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 7h14l1 13H4L5 7Z" />
                <path d="M9 9V6a3 3 0 0 1 6 0v3" />
              </svg>
            </span>
            <span>
              <strong>Layanan Sekolah</strong>
              <small>Lebih praktis dan teratur</small>
            </span>
          </div>
        </div>

        <div class="hero-decoration hero-decoration-left"></div>
        <div class="hero-decoration hero-decoration-right"></div>
      </section>

      <section class="intro-strip">
        <div class="intro-strip-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 3 8l9 5 9-5-9-5Z" />
            <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
          </svg>
        </div>
        <div>
          <strong>Dirancang untuk komunitas sekolah</strong>
          <p>
            Menghadirkan akses informasi yang lebih terstruktur bagi seluruh
            pengguna sekolah.
          </p>
        </div>
        <a href="#fitur" class="strip-link">
          Pelajari lebih lanjut <span>↗</span>
        </a>
      </section>

      <section id="fitur" class="features-section">
        <div class="section-heading">
          <span class="section-eyebrow">FITUR PORTAL</span>
          <h2>Berbagai kebutuhan sekolah, <span>satu tempat.</span></h2>
          <p>
            Temukan layanan utama yang dirancang untuk mendukung aktivitas
            akademik dan operasional sekolah.
          </p>
        </div>

        <div class="feature-grid">
          <article
            v-for="feature in features"
            :key="feature.number"
            class="feature-card"
          >
            <div class="feature-card-top">
              <span class="feature-icon" :class="`feature-${feature.tone}`">
                <svg v-if="feature.icon === 'graduation'" viewBox="0 0 24 24">
                  <path d="m2 9 10-5 10 5-10 5L2 9Z" />
                  <path d="M6 12v5c4 3 8 3 12 0v-5M22 9v6" />
                </svg>
                <svg v-else-if="feature.icon === 'wallet'" viewBox="0 0 24 24">
                  <path d="M4 6.5h15a2 2 0 0 1 2 2V19H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13" />
                  <path d="M16 12h5M17 12v.01" />
                </svg>
                <svg v-else-if="feature.icon === 'store'" viewBox="0 0 24 24">
                  <path d="M3 10v10h18V10M2 10l2-7h16l2 7" />
                  <path d="M2 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 2 0M9 20v-6h6v6" />
                </svg>
                <svg v-else-if="feature.icon === 'book'" viewBox="0 0 24 24">
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22zM4 4.5V22M8 6h8" />
                </svg>
                <svg v-else-if="feature.icon === 'clipboard'" viewBox="0 0 24 24">
                  <path d="M9 4h6M9 2h6v4H9zM6 4H4v18h16V4h-2M8 13l3 3 5-6" />
                </svg>
                <svg v-else viewBox="0 0 24 24">
                  <path d="m3 11 18-6v14L3 13zM7 14l2 7h4l-3-8M3 11v2" />
                </svg>
              </span>
              <span class="feature-number">{{ feature.number }}</span>
            </div>

            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>

            <div class="feature-card-line"></div>
          </article>
        </div>
      </section>

      <section id="pengguna" class="audience-section">
        <div class="audience-copy">
          <span class="section-eyebrow">UNTUK KOMUNITAS SEKOLAH</span>
          <h2>Setiap peran, punya <span>akses yang sesuai.</span></h2>
          <p>
            School Portal dirancang untuk mendukung berbagai kebutuhan pengguna.
            Informasi dan hak akses setiap pengguna akan disesuaikan dengan
            perannya di sekolah.
          </p>
        </div>

        <div class="audience-grid">
          <article v-for="person in audiences" :key="person.name" class="audience-card">
            <div class="audience-avatar">{{ person.initials }}</div>
            <div>
              <h3>{{ person.name }}</h3>
              <p>{{ person.description }}</p>
            </div>
            <span class="audience-arrow">↗</span>
          </article>
        </div>
      </section>

      <section class="closing-section">
        <div class="closing-shape closing-shape-one"></div>
        <div class="closing-shape closing-shape-two"></div>
        <span class="closing-eyebrow">SCHOOL PORTAL</span>
        <h2>Mulai jelajahi ekosistem sekolah digital.</h2>
        <p>
          Kenali fitur-fitur yang membantu informasi sekolah tersaji dengan
          lebih teratur dan mudah diakses.
        </p>
        <a href="#fitur" class="closing-button">
          Jelajahi Portal <span>→</span>
        </a>
      </section>
    </main>

    <footer class="lobby-footer">
      <a class="lobby-brand footer-brand" href="#beranda">
        <span class="lobby-logo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m2 9 10-5 10 5-10 5L2 9Z" />
            <path d="M6 12v5c4 3 8 3 12 0v-5" />
          </svg>
        </span>
        <span class="lobby-brand-copy">
          <strong>School Portal</strong>
          <small>Sekolah Demo</small>
        </span>
      </a>
      <p>© 2026 School Portal. Platform demo untuk kebutuhan sekolah.</p>
      <a class="footer-back" href="#beranda">Kembali ke atas ↑</a>
    </footer>
  </div>
</template>

<style>
@import './Lobby.css';
</style>
