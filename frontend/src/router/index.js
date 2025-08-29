import { createRouter, createWebHistory } from 'vue-router';
import LoginView from  '../Views/LoginView.vue';
import ClientesView from '../Views/ClientesView.vue';
import MascotasView from '../Views/MascotasView.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/clientes', component: ClientesView, meta: { requiresAuth: true } },
  { path: '/mascotas', component: MascotasView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
