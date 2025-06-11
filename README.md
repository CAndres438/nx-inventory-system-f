<p align="center">
  <img src="./public/nx.png" alt="Nx Inventory System" width="120" />
</p>

<h1 align="center">Nx Inventory System</h1>

Este es el frontend del sistema de gestión de inventario automotriz, desarrollado con **Angular 20** y **Angular Material**, 
utilizando JWT para autenticación y protección de rutas.

---

## Evidencia General (Incluye imágenes de pruebas funcionales y ERD

🔍 [Ver carpeta de evidencias](./Evidencia_General/)

## 🚀 Tecnologías

- Angular 20
- Angular Material
- RxJS
- JWT (autenticación)
- SCSS

---

## ⚙️ Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/CAndres438/nx-inventory-system-f.git
cd inventory-system-f
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm start # o ng serve si tienes instalado el CLI global
```

Por defecto, la app se ejecutará en `http://localhost:4200`

---

## 🌐 Configuración de entorno

Este proyecto utiliza archivos de entorno (`environment.ts`) para definir la URL base del backend.

- En **desarrollo**, la URL se define en `src/environments/environment.ts`:
  ```ts
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api'
  };
  ```

- En **producción**, el archivo `environment.prod.ts` se **genera o actualiza automáticamente** durante el build mediante el script `set-env.js`.  
  Este script toma la variable de entorno `NG_APP_API_URL` definida en Vercel y la inyecta en el archivo.

## 🔐 Autenticación

- Los usuarios deben iniciar sesión para acceder al sistema.
- Al iniciar sesión, se guarda el JWT en el `localStorage`.
- Las peticiones al backend incluyen el token en el header `Authorization: Bearer <token>`.

---

## 🧭 Navegación y Rutas

| Ruta         | Descripción                        | Protegida  |
|--------------|------------------------------------|------------|
| `/login`     | Página de inicio de sesión         | ❌          |
| `/register`  | Registro de usuarios               | ❌          |
| `/inventory` | Gestión de productos               | ✅ Todos    |
| `/roles`     | Administración de roles            | ✅ ADMIN    |

---

## 🔐 Protección de rutas

- Las rutas protegidas usan un `AuthGuard`.
- Si no hay token o el usuario no tiene permisos, se redirige a `/login`.

---

## 🧱 Estructura del proyecto

- `auth/` – login y registro
- `components/` – navbar, sidebar
- `pages/inventory/` – crear, editar, listar productos
- `pages/roles/` – gestión de roles
- `models/` – interfaces `Inventory`, `Role`, `User`
- `services/` – servicios para consumir APIs protegidas

---

## 🧼 Buenas prácticas

✅ Separación modular por funciones  
✅ Uso de `ReactiveForms`  
✅ Integración con Angular Material  
✅ Guards para proteger rutas  
✅ JWT para autenticación  
✅ Comunicación eficiente con el backend

---

## 👨‍💻 Autor

**Carlos Andrés Ortiz Peña**  
Senior Fullstack Developer 💻 | Frontend lover con Angular 🚀

---
