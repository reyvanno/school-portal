import api from './api'

export async function testOdooConnection() {
  const response = await api.get('/api/v1/auth/me', {
    validateStatus: status => status < 500,
  })
  return {
    status: response.status,
    data: response.data,
    csrfTokenReceived: Boolean(response.headers['x-csrf-token']),
  }
}
