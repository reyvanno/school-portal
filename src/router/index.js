import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/auth.store";

import Lobby from "../views/Lobby.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import ConnectionTest from "../views/ConnectionTest.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "lobby",
      component: Lobby,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/connection-test",
      name: "connection-test",
      component: ConnectionTest,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // Periksa session ketika membuka halaman yang membutuhkan autentikasi
  // maupun halaman khusus pengunjung.
  if (to.meta.requiresAuth || to.meta.guestOnly) {
    const authenticated = await auth.ensureSession();

    if (to.meta.requiresAuth && !authenticated) {
      return {
        name: "login",
        query: {
          redirect: to.fullPath,
        },
      };
    }

    if (to.meta.guestOnly && authenticated) {
      return {
        name: "dashboard",
      };
    }
  }
});

export default router;
