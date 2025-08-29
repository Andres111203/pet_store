import { Pool } from 'pg';
import dbConfig from './config/db.config.js';

const MAX_RETRIES = 10;
const RETRY_DELAY = 3000;

let db;

async function connectWithRetry(retries = MAX_RETRIES) {
  db = new Pool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await db.connect();
      console.log('Conexión a la base de datos establecida');
      return;
    } catch (error) {
      console.error(`Error al conectar: ${error.message}`);
      if (attempt < retries) {
        console.log(`Reintentando (${attempt}/${retries}) en ${RETRY_DELAY / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        throw new Error('🚨 No se pudo conectar después de múltiples intentos.');
      }
    }
  }
}

await connectWithRetry();

export default db;
