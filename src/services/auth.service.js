import api from "./api";

let csrfToken = null;

/**
 * Mengambil CSRF token dari response endpoint /me.
 * Endpoint ini dapat mengembalikan HTTP 401 ketika belum login,
 * tetapi tetap menyediakan CSRF token pada response header.
 */
export async function getCsrfToken() {
  const response = await api.get("/api/v1/auth/me", {
    validateStatus: (status) => status < 500,
  });

  csrfToken = response.headers["x-csrf-token"];

  if (!csrfToken) {
    throw new Error("CSRF token tidak ditemukan pada response Odoo.");
  }

  return csrfToken;
}

/**
 * Login siswa menggunakan NIS sebagai nilai field login.
 */
export async function loginStudent(nis, password) {
  const token = await getCsrfToken();

  const response = await api.post(
    "/api/v1/auth/login",
    {
      login: nis,
      password,
    },
    {
      params: {
        csrf_token: token,
      },
      headers: {
        "X-CSRF-Token": token,
      },
    },
  );

  if (response.data?.success !== true) {
    throw new Error(
      response.data?.error?.message ||
        response.data?.message ||
        "Login gagal. Periksa NIS dan password.",
    );
  }

  return response.data;
}

/**
 * Mengambil informasi user dan status session.
 */
export async function getCurrentUser() {
  const response = await api.get("/api/v1/auth/me", {
    validateStatus: (status) => status < 500,
  });

  return {
    status: response.status,
    data: response.data,
    csrfToken: response.headers["x-csrf-token"] || null,
  };
}

/**
 * Logout dari session Odoo.
 */
export async function logout() {
  const token = await getCsrfToken();

  const response = await api.post(
    "/api/v1/auth/logout",
    {},
    {
      params: {
        csrf_token: token,
      },
      headers: {
        "X-CSRF-Token": token,
      },
    },
  );

  if (response.data?.success === false) {
    throw new Error(response.data?.error?.message || "Logout gagal.");
  }

  return response.data;
}
