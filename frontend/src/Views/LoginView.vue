<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Entre Amigos</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="form.username" placeholder="Usuario" required />
        <input v-model="form.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const router = useRouter();
const form = ref({ username: '', password: '' });
const error = ref('');

const handleLogin = async () => {
  try {
    const res = await login(form.value);
    localStorage.setItem('token', res.data.token);
    router.push('/clientes');
  } catch (err) {
    error.value = 'Usuario o contraseña incorrectos';
  }
};
</script>

<style scoped>
.login-container {
  background: url('/mujer-en-tienda-de-mascotas.webp') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
