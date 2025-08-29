import { createMascota, getMascotas, updateMascota, deleteMascota } from '../models/mascota.model.js';

export const create = async (req, res) => {
  try {
    const mascota = await createMascota(req.body);
    res.status(201).json(mascota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const findAll = async (req, res) => {
  const mascotas = await getMascotas();
  res.json(mascotas);
};

export const update = async (req, res) => {
  const { id } = req.params;
  await updateMascota(id, req.body);
  res.sendStatus(204);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await deleteMascota(id);
  res.sendStatus(204);
};