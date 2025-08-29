import db from '../db.js';

export const createCliente = async ({ nombre, correo, telefono }) => {
  const result = await db.query(
    'INSERT INTO clientes (nombre, correo, telefono) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, telefono]
  );
  return result.rows[0];
};

export const getClientes = async () => {
  const result = await db.query('SELECT * FROM clientes');
  return result.rows;
};

export const updateCliente = async (id, { nombre, correo, telefono }) => {
  await db.query(
    'UPDATE clientes SET nombre = $1, correo = $2, telefono = $3 WHERE id = $4',
    [nombre, correo, telefono, id]
  );
};

export const deleteCliente = async (id) => {
  await db.query('DELETE FROM clientes WHERE id = $1', [id]);
};