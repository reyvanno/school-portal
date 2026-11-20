
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dashboard',
  },
  userName: {
    type: String,
    default: 'Pengguna',
  },
  initials: {
    type: String,
    default: 'P',
  },
})

const emit = defineEmits(['open-sidebar', 'logout'])
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <button
        type="button"
        class="icon-button mobile-menu"
        aria-label="Buka navigasi"
        @click="emit('open-sidebar')"
      >
        ☰
      </button>

      <div>
        <span class="topbar-eyebrow">SCHOOL PORTAL</span>
        <h1>{{ title }}</h1>
      </div>
    </div>

    <div class="topbar-user">
      <div class="user-avatar">{{ initials }}</div>

      <div class="user-copy">
        <strong>{{ userName }}</strong>
        <span>Pengguna portal</span>
      </div>

      <button
        class="icon-button top-logout"
        title="Keluar"
        aria-label="Keluar"
        @click="emit('logout')"
      >
        ↪
      </button>
    </div>
  </header>
</template>
