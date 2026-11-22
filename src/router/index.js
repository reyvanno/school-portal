import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import moduleRoutes from "../modules";

import Lobby from "../pages/Lobby.vue";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import ConnectionTest from "../pages/ConnectionTest.vue";

const routes = [
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
      title: "Dashboard",
    },
  },
  {
    path: "/connection-test",
    name: "connection-test",
    component: ConnectionTest,
  },

  // Route dari seluruh modul
  ...moduleRoutes,

  // Component Playground hanya tersedia saat development
  ...(import.meta.env.DEV
    ? [
        {
          path: "/dev/components",
          name: "component-playground",
          component: () => import("../dev/ComponentPlayground.vue"),
        },
      ]
    : []),

  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

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
      return { name: "dashboard" };
    }
  }
});

export default router;
