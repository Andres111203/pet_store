import db from '../db.js';

export const createMascota = async ({ nombre, especie, raza, edad, cliente_id }) => {
  const result = await db.query(
    'INSERT INTO mascotas (nombre, especie, raza, edad, cliente_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, especie, raza, edad, cliente_id]
  );
  return result.rows[0];
};

export const getMascotas = async () => {
  const result = await db.query(
    'SELECT m.*, c.nombre AS cliente_nombre FROM mascotas m JOIN clientes c ON m.cliente_id = c.id'
  );
  return result.rows;
};

export const updateMascota = async (id, { nombre, especie, raza, edad, cliente_id }) => {
  await db.query(
    'UPDATE mascotas SET nombre = $1, especie = $2, raza = $3, edad = $4, cliente_id = $5 WHERE id = $6',
    [nombre, especie, raza, edad, cliente_id, id]
  );
};

export const deleteMascota = async (id) => {
  await db.query('DELETE FROM mascotas WHERE id = $1', [id]);
};