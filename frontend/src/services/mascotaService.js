import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mascotas';

export const getMascotas = () => axios.get(API_URL);
export const createMascota = (data) => axios.post(API_URL, data);
export const updateMascota = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMascota = (id) => axios.delete(`${API_URL}/${id}`);
