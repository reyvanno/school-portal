
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

import AppSidebar from '../components/layout/AppSidebar.vue'
import AppTopbar from '../components/layout/AppTopbar.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const sidebarOpen = ref(false)

const userName = computed(() => {
  const user = auth.user

  return (
    user?.name ||
    user?.display_name ||
    user?.login ||
    'Pengguna'
  )
})

const initials = computed(() => {
  return userName.value
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
})

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

function openSidebar() {
  sidebarOpen.value = true
}

function closeSidebar() {
  sidebarOpen.value = false
}

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
    <AppSidebar
      :open="sidebarOpen"
      @close="closeSidebar"
      @logout="handleLogout"
    />

    <div class="dashboard-main">
      <AppTopbar
        :title="pageTitle"
        :user-name="userName"
        :initials="initials"
        @open-sidebar="openSidebar"
        @logout="handleLogout"
      />

      <main class="dashboard-content">
        <slot />
      </main>

      <footer class="dashboard-footer">
        © {{ new Date().getFullYear() }}
        School Portal · Portal Sekolah Digital
      </footer>
    </div>
  </div>
</template>
