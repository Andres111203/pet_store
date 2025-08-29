import { createCliente, getClientes, updateCliente, deleteCliente } from '../models/cliente.model.js';

export const create = async (req, res) => {
  try {
    const cliente = await createCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const findAll = async (req, res) => {
  const clientes = await getClientes();
  res.json(clientes);
};

export const update = async (req, res) => {
  const { id } = req.params;
  await updateCliente(id, req.body);
  res.sendStatus(204);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await deleteCliente(id);
  res.sendStatus(204);
};