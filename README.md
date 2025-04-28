# Información

Prueba técnica de CRUD de usuarios en Node.js (backend).

## Base de datos

Para ejecutar la base de datos.

```shell
use <nombre_bd>
```

## Proyecto

### Dependencias

- Node.js >= 22.3
- MongoDB >= 8.0

Para la instalación de dependencias se ejecuta el siguiente comando.

```shell
npm ci
```

### Desarrollo

```shell
npm run dev
```

### Ejecución de Seeder para los usuarios

```shell
npm run seeder
```

### Variables de entorno

| Variable              | Descripción                          |
| --------------------- | ------------------------------------ |
| `DB_NAME`             | nombre de la DB                      |
| `RANDOM_PASSWORD`     | longitud de 30 caracteres            |
| `MIN_PASSWORD_LENGTH` | longitud minima de la contraseña     |
| `MAX_PASSWORD_LENGTH` | longitud maxima de la contraseña     |
| `APP_PORT`            | puerto de ejecución de la aplicación |

### Testing

Para ejecutar las pruebas unitarias.

```shell
npm test
```

#### API

Para realizar la prueba de los endpoints en el cliente Insomnia. Se incluye la colección de endpoints para su importación.

##### `GET` `/api/usuarios`

Obtiene la lista de usuarios.

##### `POST` `/api/usuarios/add`

Genera un nuevo usuario. Valida que el email sea único.

| Parámetro   | Requierido | Notas |
| ----------- | ---------- | ----- |
| `firstname` | Si         | ---   |
| `lastName`  | Si         | ---   |
| `email`     | Si         | Único |
| `password`  | Si         | ---   |

##### `PUT` `/api/usuarios/update/{id}`

Actualiza la información del usuario.

| Parámetro   | Requierido | Notas |
| ----------- | ---------- | ----- |
| `firstname` | Si         | ---   |
| `lastName`  | Si         | ---   |
| `email`     | Si         | Único |
| `password`  | Si         | ---   |

##### `DELETE` `/api/usuarios/delete/{id}`

Elimina un usuario por ID.
