<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.nombre" placeholder="Nombre" required />
    <input v-model="form.especie" placeholder="Especie" required />
    <input v-model="form.raza" placeholder="Raza" />
    <input v-model="form.edad" type="number" placeholder="Edad" />
    <input v-model="form.cliente_id" type="number" placeholder="ID del cliente" required />
    <button>{{ form.id ? 'Actualizar' : 'Crear' }}</button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  modelValue: Object
});
const emit = defineEmits(['submit']);

const form = reactive({ ...props.modelValue });

watch(() => props.modelValue, (newVal) => {
  Object.assign(form, newVal);
});

const onSubmit = () => {
  emit('submit', { ...form });
};
</script>
