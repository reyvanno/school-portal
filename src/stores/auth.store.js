import { defineStore } from "pinia";
import { computed, ref } from "vue";

import {
  getCurrentUser,
  loginStudent,
  logout as logoutRequest,
} from "../services/auth.service";

function extractUser(payload) {
  if (payload?.success !== true) {
    return null;
  }

  const user = payload?.data;

  if (
    !user ||
    typeof user !== "object" ||
    !user.id ||
    !user.login ||
    user.active !== true
  ) {
    return null;
  }

  return user;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const checked = ref(false);
  const loading = ref(false);

  const isAuthenticated = computed(() => Boolean(user.value));

  /**
   * Login siswa.
   */
  async function login(nis, password) {
    loading.value = true;

    try {
      await loginStudent(nis, password);

      const session = await getCurrentUser();
      const authenticatedUser = extractUser(session.data);

      if (session.status < 200 || session.status >= 300 || !authenticatedUser) {
        throw new Error(
          session.data?.error?.message ||
            "Login berhasil dikirim, tetapi sesi belum terverifikasi.",
        );
      }

      user.value = authenticatedUser;
      checked.value = true;

      return authenticatedUser;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Memeriksa session saat aplikasi dibuka atau route diakses.
   */
  async function ensureSession() {
    if (checked.value) {
      return isAuthenticated.value;
    }

    try {
      const session = await getCurrentUser();

      if (session.status >= 200 && session.status < 300) {
        const authenticatedUser = extractUser(session.data);

        if (authenticatedUser) {
          user.value = authenticatedUser;
          checked.value = true;

          return true;
        }
      }
    } catch (error) {
      console.error("Gagal memeriksa session:", error.message);
    }

    user.value = null;
    checked.value = true;

    return false;
  }

  /**
   * Logout siswa.
   */
  async function logout() {
    loading.value = true;

    try {
      await logoutRequest();
    } finally {
      user.value = null;
      checked.value = true;
      loading.value = false;
    }
  }

  /**
   * Menghapus state autentikasi lokal.
   */
  function clearSession() {
    user.value = null;
    checked.value = true;
  }

  return {
    user,
    checked,
    loading,
    isAuthenticated,
    login,
    ensureSession,
    logout,
    clearSession,
  };
});
