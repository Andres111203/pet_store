<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.nombre" placeholder="Nombre" required />
    <input v-model="form.correo" placeholder="Correo" />
    <input v-model="form.telefono" placeholder="Teléfono" />
    <button>{{ form.id ? 'Actualizar' : 'Crear' }}</button>
  </form>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue';

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
