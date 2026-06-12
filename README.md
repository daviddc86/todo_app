# todo-app-react

Aplicación React para gestión de tareas. Consume la API `todo-api-nodejs`.

## Stack

- React 18 + Vite
- React Router DOM v6
- Material UI (MUI) v5
- Context API para autenticación
- Fetch API (sin Axios)

## Instalación

```bash
git clone https://github.com/tu-usuario/todo-app-react.git
cd todo-app-react
npm install
cp .env.example .env
# Edita VITE_API_URL con la URL de tu backend
```

## Variables de entorno

```env
VITE_API_URL=http://localhost:5000
```

## Ejecución local

```bash
npm run dev
# Accede en http://localhost:5173
```

## Tests

```bash
# Ejecutar todos los tests
npm test

## Build producción

```bash
npm run build
# Carpeta dist/ lista para desplegar
npm run preview  # Preview local del build
```

## Rutas

| Ruta         | Descripción                          |
|--------------|--------------------------------------|
| /login       | Página de inicio de sesión           |
| /register    | Página de registro                   |
| /dashboard   | Panel principal (ruta protegida)     |

Las rutas protegidas redirigen a `/login` si no hay token en localStorage.

## Despliegue

### Vercel

1. Crea cuenta en [vercel.com](https://vercel.com)
2. New Project → Import tu repositorio GitHub
3. Framework preset: **Vite**
4. Añade la variable de entorno `VITE_API_URL` apuntando a tu backend desplegado
5. Deploy

## Subir a GitHub

```bash
git init
git add .
git commit -m "feat: initial commit - todo app react"
git branch -M main
git remote add origin https://github.com/tu-usuario/todo-app-react.git
git push -u origin main
```
