<script setup>
import { ref } from 'vue'
import { testOdooConnection } from '../services/connection-test'

const loading = ref(false)
const result = ref(null)
const errorMessage = ref(null)

async function checkConnection() {
  loading.value = true
  result.value = null
  errorMessage.value = null
  try {
    result.value = await testOdooConnection()
  } catch (error) {
    errorMessage.value = {
      status: error.response?.status ?? 'Network Error',
      message: error.response?.data?.error?.message || error.message,
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="connection-page">
    <section class="connection-card">
      <RouterLink to="/">← Beranda</RouterLink>
      <h1>Odoo API Connection Test</h1>
      <p>Menguji apakah frontend dapat menerima respons dari backend Odoo.</p>
      <button class="auth-submit" :disabled="loading" @click="checkConnection">{{ loading ? 'Menghubungkan...' : 'Test Connection' }}</button>
      <pre v-if="result">{{ JSON.stringify(result, null, 2) }}</pre>
      <pre v-if="errorMessage">{{ JSON.stringify(errorMessage, null, 2) }}</pre>
    </section>
  </main>
</template>
