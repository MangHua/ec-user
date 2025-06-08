import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import ProfileView from "@/views/ProfileView.vue"
import { useAuthStore } from "@/stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeView,
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/merchandise/:id',
      name: 'merchandise',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Merchandise.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login.vue'),
      meta: {
        onlyGuest: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/register.vue'),
      meta: {
        onlyGuest: true,
      }
    },
    {
      path: '/cart',
      name: 'cart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/cart.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    }
  ],
});

router.beforeEach(async(to, from, next) => {
  const meta = to.meta;
  const onlyGuest = meta?.onlyGuest || false;
  const requireAuth = meta?.requiresAuth || false;
  const authStore = useAuthStore();

  if (authStore.isLogin) {
    await authStore.initUser();
  }

  if (onlyGuest && authStore.isLogin) {
    await router.push({ name: 'user-profile' });
  }

  if (requireAuth && !authStore.isLogin) {
    await router.push({ name: 'login' });
  }

  next();
})

export default router
