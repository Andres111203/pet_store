import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './routes/cliente.routes.js';
import mascotaRoutes from './routes/mascota.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor backend en puerto ${process.env.PORT}`);
});
