
<script setup>
import { ref } from 'vue'
import api from '@/services/api'
import studentService from '@/modules/students/services/student.service'

// State daftar siswa
const students = ref([])
const loading = ref(false)
const error = ref('')
const responseData = ref(null)

// State identitas pengguna
const currentUser = ref(null)
const userLoading = ref(false)
const userError = ref('')

// Mengambil identitas pengguna yang dikenali backend
const checkCurrentUser = async () => {
  userLoading.value = true
  userError.value = ''
  currentUser.value = null

  try {
    const response = await api.get('/api/v1/auth/me')

    currentUser.value = response.data

    console.log('Current User:', response.data)
  } catch (err) {
    console.error('Gagal mengambil current user:', err)

    userError.value =
      err.response?.data?.message ||
      err.message ||
      'Gagal mengambil identitas pengguna.'
  } finally {
    userLoading.value = false
  }
}

// Mengambil daftar siswa
const fetchStudents = async () => {
  loading.value = true
  error.value = ''
  responseData.value = null
  students.value = []

  try {
    const result = await studentService.getStudents({
      page: 1,
      per_page: 20,
    })

    responseData.value = result
    students.value = result.data || []

    console.log('Respons API siswa:', result)
  } catch (err) {
    console.error('Gagal mengambil data siswa:', err)

    error.value =
      err.response?.data?.message ||
      err.message ||
      'Terjadi kesalahan saat mengambil data siswa.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow">

      <h1 class="mb-2 text-2xl font-bold">
        Student API Test
      </h1>

      <p class="mb-6 text-gray-600">
        Pengujian autentikasi dan GET daftar siswa dari Odoo staging.
      </p>

      <!-- Pengujian Identitas Pengguna -->
      <section class="mb-8">
        <h2 class="mb-3 text-lg font-semibold">
          1. Identitas Pengguna
        </h2>

        <button
          @click="checkCurrentUser"
          :disabled="userLoading"
          class="rounded-lg bg-indigo-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {{ userLoading ? 'Memeriksa...' : 'Periksa Current User' }}
        </button>

        <p
          v-if="userError"
          class="mt-4 rounded-lg bg-red-100 p-4 text-red-700"
        >
          {{ userError }}
        </p>

        <div v-if="currentUser" class="mt-4">
          <h3 class="mb-2 font-medium">
            Respons Identitas Pengguna
          </h3>

          <pre class="overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">{{ JSON.stringify(currentUser, null, 2) }}</pre>
        </div>
      </section>

      <hr class="mb-8 border-gray-200" />

      <!-- Pengujian Daftar Siswa -->
      <section>
        <h2 class="mb-3 text-lg font-semibold">
          2. Daftar Siswa
        </h2>

        <button
          @click="fetchStudents"
          :disabled="loading"
          class="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {{ loading ? 'Mengambil Data...' : 'Ambil Data Siswa' }}
        </button>

        <p
          v-if="error"
          class="mt-5 rounded-lg bg-red-100 p-4 text-red-700"
        >
          {{ error }}
        </p>

        <div v-if="responseData" class="mt-6">
          <h3 class="mb-3 font-semibold">
            Hasil Respons JSON
          </h3>

          <pre class="overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">{{ JSON.stringify(responseData, null, 2) }}</pre>
        </div>

        <div v-if="responseData" class="mt-6">
          <h3 class="mb-3 text-lg font-semibold">
            Daftar Siswa ({{ students.length }})
          </h3>

          <div class="overflow-x-auto">
            <table class="w-full border-collapse text-left text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border p-3">NIS</th>
                  <th class="border p-3">Nama</th>
                  <th class="border p-3">Jenis Kelamin</th>
                  <th class="border p-3">Kelas</th>
                  <th class="border p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="student in students"
                  :key="student.id"
                >
                  <td class="border p-3">{{ student.nis }}</td>
                  <td class="border p-3">{{ student.name }}</td>
                  <td class="border p-3">{{ student.gender }}</td>
                  <td class="border p-3">{{ student.class_name || '-' }}</td>
                  <td class="border p-3">{{ student.status }}</td>
                </tr>

                <tr v-if="!students.length">
                  <td colspan="5" class="border p-3 text-center">
                    Tidak ada data siswa.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
