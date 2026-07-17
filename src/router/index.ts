import {
  createRouter,
  createWebHistory,
} from '@ionic/vue-router'

import type { RouteRecordRaw } from 'vue-router'

import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/app/dashboard',
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      guest: true,
    },
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: {
      guest: true,
    },
  },

  {
    path: '/app',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        redirect: '/app/dashboard',
      },

      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/HomePage.vue'),
      },

      {
        path: 'contents',
        name: 'contents',
        component: () => import('@/views/content/ContentListPage.vue'),
      },

      {
        path: 'contents/create',
        name: 'content-create',
        component: () => import('@/views/content/ContentFormPage.vue'),
      },

      {
        path: 'contents/:id/edit',
        name: 'content-edit',
        component: () => import('@/views/content/ContentFormPage.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore(pinia)

  auth.restore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return '/app/dashboard'
  }

  return true
})

export default router