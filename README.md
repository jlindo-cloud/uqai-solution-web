# UQ AI Solution Company — Sitio Web Corporativo Seguro

Proyecto full-stack desarrollado para el parcial de **Programación Segura (DD281)** —
Universidad Autónoma del Perú, 2026-1.

Sitio web corporativo de **UQ AI Solution Company** (empresa peruana de Inteligencia
Artificial) construido aplicando principios de programación segura: hashing con bcrypt,
autenticación con JWT, cookies HttpOnly, control de acceso por roles (RBAC), CORS y
validación de inputs.

## Enlaces del proyecto

| Recurso | Enlace |
|---|---|
| Frontend desplegado (Vercel) | _https://.....vercel.app_ |
| Backend desplegado (Railway) | _https://.....up.railway.app_ |
| Video de demostración | _https://...._ |

> Completar con tus URLs públicas una vez desplegado.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | Java 17 + Spring Boot 3 + Spring Security |
| Base de datos | H2 (en memoria) + JPA/Hibernate |
| Autenticación | JWT + bcrypt (factor 12) |
| Deploy | Vercel (frontend) + Railway (backend) |

## Estructura

```
uqai-solution-web/
├── backend/          Proyecto Spring Boot (API REST segura)
├── frontend/         Proyecto Next.js 14 (landing + login + dashboard)
├── DEFENSA.md        Justificación de cada decisión de seguridad
└── README.md
```

## Cómo ejecutar en local

### Backend (puerto 8080)

Requiere **Java 17+** y **Maven**.

```bash
cd backend
mvn spring-boot:run
```

- Consola H2: `http://localhost:8080/h2-console` (JDBC: `jdbc:h2:mem:BD_lindo_jhonn_T1`, user `sa`, sin password)
- Usuarios de prueba creados al arrancar:
  - `admin@uqai.pe` / `Admin2026!` (ADMIN)
  - `user@uqai.pe` / `User2026!` (USER)

### Frontend (puerto 3000)

Requiere **Node 18.17+**.

```bash
cd frontend
npm install
npm run dev
```

Asegúrate de que `frontend/.env.local` tenga `NEXT_PUBLIC_API_URL=http://localhost:8080`
con el backend corriendo.

## Endpoints de la API

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público (retorna JWT) |
| GET | `/api/usuarios` | Solo ADMIN |
| GET | `/api/usuarios/{id}` | ADMIN o el mismo usuario |
| POST | `/api/leads` | Público (formulario de contacto) |
| GET | `/api/leads` | Solo ADMIN |

## Seguridad aplicada

Contraseñas con **bcrypt (factor 12)**, nunca en texto plano. **JWT firmado** (HMAC-SHA256)
para autenticación stateless. **Cookie HttpOnly + Secure + SameSite=Strict** para el token en
el frontend (no se usa localStorage). **RBAC** con roles ADMIN/USER. **CORS** restringido a los
dominios del frontend. **Validación de inputs** con Bean Validation. **Mensaje de error genérico**
en el login para evitar enumeración de usuarios. Ver `DEFENSA.md` para la justificación detallada.

---

*Programación Segura DD281 · Universidad Autónoma del Perú · 2026-1*
