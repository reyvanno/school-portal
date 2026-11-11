<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const sidebarOpen = ref(false)
const userName = computed(() => {
  const user = auth.user
  return user?.name || user?.display_name || user?.login || 'Pengguna'
})
const initials = computed(() => userName.value.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase())

async function handleLogout() {
  try {
    await auth.logout()
    await router.replace({ name: 'login' })
  } catch (error) {
    console.error('Logout gagal:', error)
    auth.clearSession()
    await router.replace({ name: 'login' })
  }
}
</script>

<template>
  <div class="dashboard-shell">
    <button v-if="sidebarOpen" class="sidebar-overlay" aria-label="Tutup navigasi" @click="sidebarOpen = false"></button>
    <aside class="sidebar" :class="{ 'sidebar--open': sidebarOpen }">
      <div class="sidebar-brand">
        <span class="brand-mark">S</span>
        <span><strong>School Portal</strong><small>Portal Sekolah Digital</small></span>
        <button class="icon-button sidebar-close" aria-label="Tutup menu" @click="sidebarOpen = false">×</button>
      </div>

      <div class="nav-caption">MENU UTAMA</div>
      <nav class="side-nav">
        <RouterLink to="/dashboard" class="side-link" :class="{ 'side-link--active': route.path === '/dashboard' }" @click="sidebarOpen = false">
          <span class="side-icon">⌂</span><span>Dashboard</span>
        </RouterLink>
        <div class="side-link side-link--disabled"><span class="side-icon">▦</span><span>Akademik</span><small>Segera</small></div>
        <div class="side-link side-link--disabled"><span class="side-icon">Rp</span><span>Tagihan SPP</span><small>Segera</small></div>
        <div class="side-link side-link--disabled"><span class="side-icon">▣</span><span>Koperasi</span><small>Segera</small></div>
        <div class="side-link side-link--disabled"><span class="side-icon">▤</span><span>Perpustakaan</span><small>Segera</small></div>
        <div class="side-link side-link--disabled"><span class="side-icon">✓</span><span>Kehadiran</span><small>Segera</small></div>
        <div class="side-link side-link--disabled"><span class="side-icon">◉</span><span>Pengumuman</span><small>Segera</small></div>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-help"><strong>Butuh bantuan?</strong><p>Hubungi administrator sekolah untuk bantuan akses portal.</p></div>
        <button class="side-link logout-link" @click="handleLogout"><span class="side-icon">↪</span><span>Keluar</span></button>
      </div>
    </aside>

    <div class="dashboard-main">
      <header class="topbar">
        <div class="topbar-left">
          <button class="icon-button mobile-menu" aria-label="Buka navigasi" @click="sidebarOpen = true">☰</button>
          <div><span class="topbar-eyebrow">SCHOOL PORTAL</span><h1>Dashboard</h1></div>
        </div>
        <div class="topbar-user">
          <div class="user-avatar">{{ initials }}</div>
          <div class="user-copy"><strong>{{ userName }}</strong><span>Pengguna portal</span></div>
          <button class="icon-button top-logout" title="Keluar" aria-label="Keluar" @click="handleLogout">↪</button>
        </div>
      </header>

      <main class="dashboard-content">
        <slot />
      </main>
      <footer class="dashboard-footer">© {{ new Date().getFullYear() }} School Portal · Portal Sekolah Digital</footer>
    </div>
  </div>
</template>
