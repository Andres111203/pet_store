<template>
  <div class="mascotas-container">
    <h2>Mascotas</h2>

    <form class="mascota-form" @submit.prevent="guardarMascota">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input id="nombre" v-model="mascota.nombre" placeholder="Nombre" required />
      </div>
      <div class="form-group">
        <label for="especie">Especie</label>
        <input id="especie" v-model="mascota.especie" placeholder="Especie" required />
      </div>
      <div class="form-group">
        <label for="raza">Raza</label>
        <input id="raza" v-model="mascota.raza" placeholder="Raza" />
      </div>
      <div class="form-group">
        <label for="edad">Edad</label>
        <input id="edad" v-model="mascota.edad" type="number" placeholder="Edad" />
      </div>
      <div class="form-group">
        <label for="cliente_id">Cliente</label>
        <select id="cliente_id" v-model="mascota.cliente_id" required>
          <option disabled value="">Seleccione un cliente</option>
          <option v-for="c in clientes" :key="c.id" :value="c.id">
            {{ c.nombre }}
          </option>
        </select>
      </div>
      <button>{{ mascota.id ? 'Actualizar' : 'Crear' }}</button>
    </form>

    <table class="tabla-mascotas">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Raza</th>
          <th>Edad</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in mascotas" :key="m.id">
          <td>{{ m.id }}</td>
          <td>{{ m.nombre }}</td>
          <td>{{ m.especie }}</td>
          <td>{{ m.raza }}</td>
          <td>{{ m.edad }}</td>
          <td>{{ m.cliente_nombre }}</td>
          <td>
            <button class="editar" @click="editar(m)">Editar</button>
            <button class="eliminar" @click="eliminar(m.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getMascotas,
  createMascota,
  updateMascota,
  deleteMascota
} from '../services/mascotaService';
import { getClientes } from '../services/clienteService';

const clientes = ref([]);

const mascotas = ref([]);
const mascota = ref({
  nombre: '',
  especie: '',
  raza: '',
  edad: null,
  cliente_id: null,
  id: null
});

const cargar = async () => {
  const res = await getMascotas();
  mascotas.value = res.data;
};

const guardarMascota = async () => {
  if (mascota.value.id) {
    await updateMascota(mascota.value.id, mascota.value);
  } else {
    await createMascota(mascota.value);
  }
  mascota.value = { nombre: '', especie: '', raza: '', edad: null, cliente_id: null, id: null };
  await cargar();
};

const editar = (m) => {
  mascota.value = { ...m };
};

const eliminar = async (id) => {
  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
  if (!confirmar) return;

  await deleteMascota(id);
  await cargar();
};

onMounted(async () => {
  await cargar();
  const res = await getClientes();
  clientes.value = res.data;
});
</script>

<style scoped>
.mascotas-container {
  background: url('/mascotas-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding: 2rem;
  backdrop-filter: blur(3px);
}

.mascota-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 200px;
}

.mascota-form input,
.mascota-form select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.mascota-form button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;
}

.tabla-mascotas {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.95);
}

.tabla-mascotas th,
.tabla-mascotas td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.tabla-mascotas th {
  background-color: #f2f2f2;
}

button.editar {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  border-radius: 4px;
}

button.eliminar {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}
</style>
