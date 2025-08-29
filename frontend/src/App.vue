<template>
  <div>
    <header v-if="showNavbar" class="navbar">
      <h1 class="logo"><span class="paw">🐾</span> Tienda de Mascotas</h1>
      <nav>
        <router-link to="/clientes" class="nav-link">Clientes</router-link>
        <router-link to="/mascotas" class="nav-link">Mascotas</router-link>
        <button @click="logout" class="logout-button">Cerrar sesión</button>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const showNavbar = computed(() => route.path !== '/login');

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2196f3; 
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.8rem;
  margin: 0;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.paw {
  color: white; 
  margin-right: 0.5rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}

.logout-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
