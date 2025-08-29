CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100),
  telefono VARCHAR(20)
);

CREATE TABLE mascotas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  especie VARCHAR(50),
  raza VARCHAR(100),
  edad INTEGER,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE RESTRICT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

insert into users(username, password) values('admin1', '$2b$10$R13F9FZPXTcOYoKPZDBRXO.pTvpCx/AP.aCFOcFkHyID.QUPjzq9K');