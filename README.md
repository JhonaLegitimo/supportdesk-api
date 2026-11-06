# Supportdesk API

API de mesa de ayuda para gestionar tickets de soporte, desarrollada con NestJS y TypeScript.

## Estado actual

- Consulta, creación y actualización de tickets con almacenamiento en memoria.
- Validación de entradas mediante DTO y `ValidationPipe`.
- Identificadores UUID, prioridad y fechas de creación y actualización.
- Endpoints de información y estado del servicio.

Los tickets se pierden al reiniciar el proceso. La persistencia con Prisma/PostgreSQL, la autenticación y Swagger aún no están implementados.

## Requisitos

- Node.js 24 (ver `.nvmrc` y `engines` en `package.json`).
- npm.
- Docker Compose para los servicios opcionales de PostgreSQL.

## Instalación y ejecución

```bash
npm ci
cp .env.example .env
npm run start:dev
```

La API escucha en [http://127.0.0.1:3002](http://127.0.0.1:3002). El puerto se configura con `PORT` en `.env`.

## Rutas disponibles

| Método | Ruta           | Descripción          |
| ------ | -------------- | -------------------- |
| GET    | `/`            | Identidad de la API  |
| GET    | `/health`      | Estado del servicio  |
| GET    | `/tickets`     | Listar tickets       |
| GET    | `/tickets/:id` | Consultar un ticket  |
| POST   | `/tickets`     | Crear un ticket      |
| PATCH  | `/tickets/:id` | Actualizar un ticket |

Ejemplo de creación:

```bash
curl -X POST http://127.0.0.1:3002/tickets \
  -H 'Content-Type: application/json' \
  -d '{"title":"Error al iniciar sesión","description":"La aplicación devuelve un error al acceder.","priority":"HIGH"}'
```

`title` admite entre 5 y 120 caracteres; `description`, entre 10 y 5000. Ambos deben contener texto. `priority` es opcional y admite `LOW`, `MEDIUM` o `HIGH`; al crear, su valor predeterminado es `MEDIUM`. El estado inicial es `OPEN`. Los campos desconocidos y los valores inválidos devuelven `400`; un ticket inexistente devuelve `404`.

Las peticiones de `requests/health.http` permiten consultar la información y el estado del servicio desde un cliente HTTP.

## Comprobaciones

```bash
npm run lint
npm run format:check
npm run build
npm test
# Ejecutar todas las comprobaciones anteriores:
npm run check
```

La prueba HTTP existente comprueba la respuesta de `GET /`. Las pruebas actuales no necesitan PostgreSQL.

## PostgreSQL

```bash
npm run db:up
npm run db:stop
```

El servicio de desarrollo utiliza el puerto local `5542` y el perfil de pruebas, `5544`:

```bash
npm run db:test:up
npm run db:test:stop
```

Las credenciales de Compose se configuran con `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_TEST_USER` y `POSTGRES_TEST_PASSWORD` en `.env`. Deben coincidir con las URL de conexión correspondientes. Los valores de los archivos de ejemplo son exclusivamente locales. Detener los servicios conserva los volúmenes.

Prisma está configurado con CommonJS, pero el esquema todavía no contiene modelos. Los comandos de migración y generación se utilizarán cuando se incorpore la persistencia.

## Configuración

Consulta `.env.example` y `.env.test.example`. La configuración de JWT está reservada para la futura autenticación. `.env`, dependencias, artefactos de compilación y el cliente generado quedan excluidos de Git.
