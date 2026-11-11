import api from './api'

let csrfToken = null

export async function getCsrfToken() {
  const response = await api.get('/api/v1/auth/me', {
    validateStatus: status => status < 500,
  })
  csrfToken = response.headers['x-csrf-token'] || response.headers['X-CSRF-Token']
  if (!csrfToken) throw new Error('CSRF token tidak ditemukan pada response Odoo.')
  return csrfToken
}

// API Odoo memakai field "login". Nilainya adalah NIS siswa.
export async function loginStudent(nis, password) {
  const token = await getCsrfToken()
  const response = await api.post('/api/v1/auth/login',
    { login: nis, password },
    { params: { csrf_token: token }, headers: { 'X-CSRF-Token': token } },
  )
  return response.data
}

export async function getCurrentUser() {
  const response = await api.get('/api/v1/auth/me', {
    validateStatus: status => status < 500,
  })
  return {
    status: response.status,
    data: response.data,
    csrfToken: response.headers['x-csrf-token'],
  }
}

export async function logout() {
  const token = await getCsrfToken()
  const response = await api.post('/api/v1/auth/logout', {},
    { params: { csrf_token: token }, headers: { 'X-CSRF-Token': token } },
  )
  return response.data
}
