
## Endpoints

### SignUp

```http
  POST http://localhost:4000/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Response

```json
  {
    "user": {
        "_id": "63aa3f0a37df5063d4c0abfb",
        "name": "Andres Manzano 1",
        "username": "ar.manzano.94@gmail.com",
        "currentaccess": "d6585e86969690a5580b9f0d3c74390f0f98b59d",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWEzZjBhMzdkZjUwNjNkNGMwYWJmYiIsImlhdCI6MTY3MjEwMTY0MiwiZXhwIjoxNjc1NzAxNjQyfQ.6Srlnu8fKiS56D_6jgBa796Qw_RM8qLApT-3ijGWmeo"
    },
    "validateSession": true,
    "redirect": "https://www.themoviedb.org/authenticate/d6585e86969690a5580b9f0d3c74390f0f98b59d?redirect_to=http://localhost:4000/auth/approved"
  }
```
Debes de pegar en el navegador el campo `redirect` para otorgarnos los permisos con tu usuario de generar request a la API de TMDB.
Tambien debes guarda el token para todos los demas request. Es un token de tipo `Barer`


### Login

```http
  POST http://localhost:4000/auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Response

```json
  {
    "user": {
        "_id": "63a4d5454731abca8d9c19c8",
        "name": "Andres Manzano 1",
        "username": "ar_manzano@hotmail.com",
        "currentaccess": "053848eac88c05bce8603aea75c305c4b1b1f982",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTRkNTQ1NDczMWFiY2E4ZDljMTljOCIsImlhdCI6MTY3MjE2MTU4NCwiZXhwIjoxNjc1NzYxNTg0fQ.IEcv5xmbycZ4SYC47iBkHun89TmxmYqhWbl7-0iJCnw",
        "session_id": "8fe0e168781e9b0e8eae905a0a568a7bad0d0527"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTRkNTQ1NDczMWFiY2E4ZDljMTljOCIsImlhdCI6MTY3MjE2MTU4NCwiZXhwIjoxNjc1NzYxNTg0fQ.IEcv5xmbycZ4SYC47iBkHun89TmxmYqhWbl7-0iJCnw",
    "type": "Bearer",
    "expires_in": 3600
  }
```

`Recuerde enviar el token en cada uno de los request, de no hacerlo retornará un error de tipo No Autorizado`

#### Obtener lista de peliculas populares

```http
  GET http://localhost:4000/movie/popular?language=es&page=1
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `language`      | `string` | **No Required**. |
| `page`      | `string` | **No Required**. |


#### Buscar pelicula por titulo
```http
  GET http://localhost:4000/movie/search?language=en-US&query=avatar&page=1&include_adult=false
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `language`      | `string` | **No Required**. |
| `page`      | `string` | **No Required**. |
| `query`      | `string` | **Campo de busqueda por título de la pelicula**. |
| `include_adult`      | `string` | **true ó false**. |


#### Buscar pelicula por ID
```http
  GET http://localhost:4000/movie/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. |

#### Agregar como pelicula favorita
```http
  POST http://localhost:4000/favoritemovie
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `movieID`      | `number` | **Required**. |

Este request funciona como un toggle de agregar o quitar la pelicula cada vez que se llama

#### Obtener mis peliculas favoritas
```http
  GET http://localhost:4000/movie/favorites
```


#### Agregar Nota
```http
  POST http://localhost:4000/notesmovie
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `movieID`      | `number` | **Required**. |
| `noteTitle`      | `string` | **Required**. |
| `description`      | `string` | **Required**. |


#### Actualizar nota
```http
  PUT http://localhost:4000/notesmovie/${_id_movie}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `noteTitle`      | `string` | **No Required**. |
| `description`      | `string` | **No Required**. |

Ejemplo `http://localhost:4000/notesmovie/63a4ea04cdd2d81b3cab93ce`

#### Obtener todas las notas de una pelicula
```http
  GET http://localhost:4000/notesmovie/all/${_id_movie}
```
Ejemplo `http://localhost:4000/notesmovie/63a4ea04cdd2d81b3cab93cc`