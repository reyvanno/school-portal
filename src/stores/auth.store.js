import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCurrentUser, loginStudent, logout as logoutRequest } from '../services/auth.service'

function extractUser(payload) {
  return payload?.data?.user ?? payload?.user ?? payload?.data ?? payload ?? null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const checked = ref(false)
  const loading = ref(false)
  const isAuthenticated = computed(() => Boolean(user.value))

  async function login(nis, password) {
    loading.value = true
    try {
      await loginStudent(nis, password)
      const session = await getCurrentUser()
      if (session.status < 200 || session.status >= 300) {
        throw new Error(session.data?.error?.message || 'Login berhasil dikirim, tetapi sesi belum terverifikasi.')
      }
      user.value = extractUser(session.data)
      checked.value = true
      return session.data
    } finally {
      loading.value = false
    }
  }

  async function ensureSession() {
    if (checked.value && user.value) return true
    try {
      const session = await getCurrentUser()
      if (session.status >= 200 && session.status < 300) {
        const candidate = extractUser(session.data)
        // Endpoint /me yang mengembalikan HTTP 200 dianggap sesi aktif.
        user.value = candidate || { authenticated: true }
        checked.value = true
        return true
      }
    } catch {
      // Session tidak tersedia atau server tidak dapat dijangkau.
    }
    user.value = null
    checked.value = true
    return false
  }

  async function logout() {
    try {
      await logoutRequest()
    } finally {
      user.value = null
      checked.value = true
    }
  }

  function clearSession() {
    user.value = null
    checked.value = true
  }

  return { user, checked, loading, isAuthenticated, login, ensureSession, logout, clearSession }
})
