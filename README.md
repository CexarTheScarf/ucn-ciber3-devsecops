# ucn-ciber3-devsecops
Implementación de ambiente DevSecOps para una aplicación básica de login/password, para el curso de Ciberseguridad III: Seg. en el Des. de Sw.

# Comandos de ejecución del proyecto (modo de desarrollo)

1. Instalar dependencias del proyecto:
```bash
npm install
```

2. Asegurarse que existe el archivo `.env` en el repositorio (o que estas variables de entorno sean inyectadas mediante Docker, Docker Compose, Kubernetes, etc). El siguiente archvo `.env` será usado para este ejemplo:
```dosini
# Database configuration
DATABASE_URL="postgresql://postgres:test@localhost:5432/devsecops?schema=public"

# Auth configuration
AUTH_SIGN="ahZebHtQ90FoDlwdUix7nl6UbL39J1l5HHYJDdw3R0csKEBb90"
AUTH_KEY="iZq_wCK6s1S9oLQQuszi42NeNGfni9aekbTe8rKHDoE"
AUTH_ISS="http://localhost:80"
AUTH_EXP="1d"
AUTH_SIGN_ALG="HS256"
AUTH_ENCRYPT_ALG="A256KW"
AUTH_ENCRYPT_ENC="A256GCM"
AUTH_COOKIE_NAME="auth"

# Middleware configuration
NEXT_PATHNAME_HEADER="x-next-pathname"

# Crypto configuration
SECRET_SALT="N2z3W6K3xxD0FqQblFAJBsNVHSpl4HQfZESG14lH7HUoaGPp61"
SALT_ROUNDS="10"
```

3. Hacer inserción de esquema en la base de datos (Para este ejemplo: PostgreSQL), generar el cliente Prisma.
Adicionalmente se puede realizar un seed para crear usuarios por defecto en la base de datos (véase script `seed.ts` dentro de la carpeta `prisma`). También el `.env` de ejemplo anterior considera que la base de datos tiene el nombre `devsecops`, y el usuario que ingresará será `postgres` con la contraseña `test`, ejecutándose en `localhost`, puerto por defecto `5432`.
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. Ejecutar el proyecto en modo development:
Por defecto, se ejecutará en `http://localhost:80`.
```bash
npm run dev
```