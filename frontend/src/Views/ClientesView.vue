<template>
  <div class="clientes-container">
    <h2>Clientes</h2>
  <div v-if="mensaje" :class="['mensaje', tipoMensaje]">
      {{ mensaje }}
  </div>

    <form class="cliente-form" @submit.prevent="guardarCliente">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input id="nombre" type="text" v-model="cliente.nombre" placeholder="Nombre" required />
      </div>
      <div class="form-group">
        <label for="correo">Correo</label>
        <input id="correo" type="email" v-model="cliente.correo" placeholder="Correo" />
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input id="telefono" type="text" v-model="cliente.telefono" placeholder="Teléfono" />
      </div>
      <button>{{ cliente.id ? 'Actualizar' : 'Crear' }}</button>
    </form>

    <table class="tabla-clientes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>{{ c.correo }}</td>
          <td>{{ c.telefono }}</td>
          <td>
            <button class="editar" @click="editar(c)">Editar</button>
            <button class="eliminar" @click="eliminar(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const mensaje = ref('');
const tipoMensaje = ref(''); 
import { ref, onMounted } from 'vue';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
} from '../services/clienteService';

const clientes = ref([]);
const cliente = ref({
  nombre: '',
  correo: '',
  telefono: '',
  id: null
});

const cargar = async () => {
  const res = await getClientes();
  clientes.value = res.data;
};

const guardarCliente = async () => {
  if (cliente.value.id) {
    await updateCliente(cliente.value.id, cliente.value);
  } else {
    await createCliente(cliente.value);
  }
  cliente.value = { nombre: '', correo: '', telefono: '', id: null };
  await cargar();
};

const editar = (c) => {
  cliente.value = { ...c };
};

const eliminar = async (id) => {
  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
  if (!confirmar) return;

  try {
    await deleteCliente(id);
    await cargar();
    mensaje.value = 'Cliente eliminado correctamente';
    tipoMensaje.value = 'exito';
  } catch (err) {
    mensaje.value = 'No se pudo eliminar el cliente: tiene mascotas asociadas';
    tipoMensaje.value = 'error';
    console.error(err);
  }

  setTimeout(() => {
    mensaje.value = '';
    tipoMensaje.value = '';
  }, 4000);
};


onMounted(cargar);
</script>

<style scoped>
.clientes-container {
  background: url('/clientes-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding: 2rem;
  backdrop-filter: blur(3px);
}

.cliente-form {
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

.cliente-form label {
  font-weight: bold;
  margin-bottom: 4px;
}

.cliente-form input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 35px;
  font-size: 14px;
  box-sizing: border-box;
}

.cliente-form button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;
}

.tabla-clientes {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.95);
}

.tabla-clientes th,
.tabla-clientes td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.tabla-clientes th {
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

.mensaje {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

.mensaje.exito {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensaje.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

</style>
