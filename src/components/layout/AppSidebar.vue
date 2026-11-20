
<script setup>
import { useRoute } from 'vue-router'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'logout'])

const route = useRoute()

const menuItems = [
  {
    label: 'Dashboard',
    icon: '⌂',
    path: '/dashboard',
    disabled: false,
  },
  {
    label: 'Akademik',
    icon: '▦',
    disabled: true,
  },
  {
    label: 'Tagihan SPP',
    icon: 'Rp',
    disabled: true,
  },
  {
    label: 'Koperasi',
    icon: '▣',
    disabled: true,
  },
  {
    label: 'Perpustakaan',
    icon: '▤',
    disabled: true,
  },
  {
    label: 'Kehadiran',
    icon: '✓',
    disabled: true,
  },
  {
    label: 'Pengumuman',
    icon: '◉',
    disabled: true,
  },
]
</script>

<template>
  <button
    v-if="open"
    class="sidebar-overlay"
    aria-label="Tutup navigasi"
    @click="emit('close')"
  ></button>

  <aside
    class="sidebar"
    :class="{ 'sidebar--open': open }"
  >
    <div class="sidebar-brand">
      <span class="brand-mark">S</span>

      <span>
        <strong>School Portal</strong>
        <small>Portal Sekolah Digital</small>
      </span>

      <button
        type="button"
        class="icon-button sidebar-close"
        aria-label="Tutup menu"
        @click="emit('close')"
      >
        ×
      </button>
    </div>

    <div class="nav-caption">MENU UTAMA</div>

    <nav class="side-nav">
      <template v-for="item in menuItems" :key="item.label">
        <RouterLink
          v-if="!item.disabled"
          :to="item.path"
          class="side-link"
          :class="{
            'side-link--active': route.path === item.path,
          }"
          :aria-current="route.path === item.path ? 'page' : undefined"
          @click="emit('close')"
        >
          <span class="side-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>

        <div
          v-else
          class="side-link side-link--disabled"
        >
          <span class="side-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
          <small>Segera</small>
        </div>
      </template>
    </nav>

    <div class="sidebar-bottom">
      <div class="sidebar-help">
        <strong>Butuh bantuan?</strong>
        <p>
          Hubungi administrator sekolah untuk bantuan akses portal.
        </p>
      </div>

      <button
        class="side-link logout-link"
        @click="emit('logout')"
      >
        <span class="side-icon">↪</span>
        <span>Keluar</span>
      </button>
    </div>
  </aside>
</template>
