<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const nis = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleLogin() {
  errorMessage.value = ''
  if (!nis.value.trim() || !password.value) {
    errorMessage.value = 'Masukkan NIS dan password terlebih dahulu.'
    return
  }
  try {
    await auth.login(nis.value.trim(), password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    await router.replace(redirect)
  } catch (error) {
    errorMessage.value = error.response?.data?.error?.message
      || error.response?.data?.message
      || error.message
      || 'Login gagal. Periksa NIS dan password.'
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <RouterLink to="/" class="auth-brand"><span class="brand-mark">S</span><span><strong>School Portal</strong><small>Portal Sekolah Digital</small></span></RouterLink>
      <div class="auth-heading"><span class="welcome-kicker">SELAMAT DATANG KEMBALI</span><h1>Masuk ke akunmu</h1><p>Gunakan NIS dan password yang telah diberikan sekolah.</p></div>
      <form class="auth-form" @submit.prevent="handleLogin">
        <label for="nis">Nomor Induk Siswa (NIS)</label>
        <input id="nis" v-model.trim="nis" type="text" inputmode="numeric" autocomplete="username" placeholder="Masukkan NIS" required />
        <label for="password">Password</label>
        <div class="password-field"><input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" placeholder="Masukkan password" required /><button type="button" @click="showPassword = !showPassword">{{ showPassword ? 'Sembunyikan' : 'Lihat' }}</button></div>
        <p v-if="errorMessage" class="auth-error" role="alert">{{ errorMessage }}</p>
        <button class="auth-submit" type="submit" :disabled="auth.loading">{{ auth.loading ? 'Memeriksa akun...' : 'Masuk ke Portal' }} <span>→</span></button>
      </form>
      <p class="auth-footnote">Mengalami kendala saat masuk? Hubungi administrator sekolah.</p>
      <RouterLink class="back-home" to="/">← Kembali ke halaman utama</RouterLink>
    </section>
  </main>
</template>
