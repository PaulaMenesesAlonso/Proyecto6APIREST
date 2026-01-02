# ClassicFilm API – Proyecto Backend con Node.js, Express y MongoDB

Este proyecto consiste en una API REST desarrollada con Node.js, Express y MongoDB Atlas, que permite gestionar información de películas y directores de cine clásico.
Incluye un CRUD completo para ambas entidades, una relación 1:N (un director puede tener varias películas) y una semilla para poblar inicialmente la colección de películas.

## 1. Tecnologías utilizadas

- Node.js

- Express

- MongoDB Atlas

- Mongoose

- Nodemon

- dotenv

## 2. Características principales

- API REST estructurada en rutas, controladores y modelos.

- Conexión con MongoDB Atlas utilizando Mongoose.

- Modelos Movie y Director con validaciones básicas.

- Relación entre colecciones mediante un array de ObjectId.

- CRUD completo para películas y directores.

- Endpoint personalizado para añadir películas a un director evitando duplicados.

- Semilla inicial para poblar la colección de películas.

- Proyecto estructurado siguiendo buenas prácticas.

## 3. Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/PaulaMenesesAlonso/Proyecto6APIREST.git
cd Proyecto6APIREST
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo .env en la raíz del proyecto con la cadena de conexión:

```.env
MONGO_URL=tu_cadena_de_conexion
PORT=3000
```

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se iniciará en:
http://localhost:3000

## 4. Estructura del proyecto

Proyecto6APIREST/
│
├── api/
│ ├── controllers/
│ │ ├── directors.controller.js
│ │ └── movies.controller.js
│ ├── models/
│ │ ├── Director.js
│ │ └── Movie.js
│ └── routes/
│ ├── directors.routes.js
│ └── movies.routes.js
│
├── config/
│ └── db.js
│
├── seed/
│ ├── movies.seed.js
│ └── movies.data.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md

## 5. Modelos

Movie
{
title: String,
year: Number,
genre: String,
description: String
}

Director
{
name: String,
country: String,
movies: [ObjectId] // Referencia a películas
}

## 6. Endpoints

### Películas (`/movies`)

| Método | Endpoint    | Descripción                 |
| ------ | ----------- | --------------------------- |
| GET    | /movies     | Obtener todas las películas |
| GET    | /movies/:id | Obtener una película por ID |
| POST   | /movies     | Crear una película          |
| PUT    | /movies/:id | Actualizar una película     |
| DELETE | /movies/:id | Eliminar una película       |

### Directores (`/directors`)

| Método | Endpoint                 | Descripción                                         |
| ------ | ------------------------ | --------------------------------------------------- |
| GET    | /directors               | Obtener todos los directores                        |
| GET    | /directors/:id           | Obtener un director por ID                          |
| POST   | /directors               | Crear un director                                   |
| PUT    | /directors/:id           | Actualizar un director (sin borrar su array movies) |
| DELETE | /directors/:id           | Eliminar un director                                |
| PUT    | /directors/:id/add-movie | Añadir o eliminar una película del director         |

## 7. Semilla (Seed)

El proyecto incluye una semilla que añade películas clásicas a la colección movies.

Ejecutar con:

```bash
node seed/movies.seed.js
```

Una vez finalizada la carga de datos, la conexión con la base de datos se cierra automáticamente.

## 8. Relación entre director y películas

- La relación es de tipo 1:N (un director puede tener varias películas).

- El campo movies en el modelo Director almacena un array de ObjectId.

- Se usa populate('movies') para devolver la información completa de las películas asociadas.

- Los endpoints de creación y actualización de directores permiten gestionar las películas asociadas.

- Se evita la duplicidad de IDs en el array de películas.

- Al actualizar datos del director, el array movies no se borra a menos que se envíe explícitamente vacío.

- Al eliminar una película, se eliminan también sus referencias en los directores para evitar datos huérfanos.

## 9. Estado del proyecto

Este proyecto cumple todos los requisitos exigidos:

- Servidor Express operativo

- Conexión correcta mediante Mongoose

- Dos modelos implementados

- Seed funcional

- Relación entre colecciones

- CRUD completo en ambas entidades

- Evitar duplicados en arrays relacionados

- Actualización sin borrar referencias

- Documentación completa en este README

## 10. Autora

Paula Meneses Alonso
Proyecto desarrollado para el módulo de Backend.
