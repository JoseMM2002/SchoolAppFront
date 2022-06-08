import { useTokenStore } from 'src/stores/Token'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: {requiresAuth:true},
    children: [
      { path: '/admin/servicios', component: () => import('pages/Admin/Servicios.vue') },
      { path: '/admin/alumnos', component: () => import('pages/Admin/Alumnos.vue')},
      { path: '/admin/materias', component: () => import('pages/Admin/Materias.vue')},
      { path: '/admin/niveles', component: () => import('pages/Admin/Niveles.vue')}
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path:'/login',
    component: () => import('pages/Login.vue')
  },
  {
    path:'/register',
    component: () => import('pages/Register.vue')
  }
]
export default routes
