# GUÍA DE DEFENSA — Cómo explicar cada parte (para el docente)

El examen evalúa que **puedas explicar cada línea**. Aquí tienes la justificación de cada decisión de seguridad, lista para defender oralmente.

## bcrypt (almacenamiento de contraseñas) — `SecurityConfig.passwordEncoder()`
"Uso `BCryptPasswordEncoder(12)`. bcrypt es un hash **unidireccional** (no se puede revertir), **lento a propósito** (factor de coste 12 = 2¹² rondas) e incorpora **sal aleatoria por usuario**, lo que lo hace resistente a fuerza bruta y a rainbow tables. Nunca guardo la contraseña en texto plano: en `AuthService.register` aplico `passwordEncoder.encode(...)` antes de persistir."

## JWT firmado — `JwtService`
"El token se firma con **HMAC-SHA256** usando una clave de ≥256 bits. El cliente no puede modificar el payload (rol, email) sin invalidar la firma. En `isTokenValid` verifico firma, expiración y que el email coincida. El secreto se lee de variable de entorno, no está hardcodeado en producción."

## Stateless + filtro JWT — `SecurityConfig` + `JwtAuthFilter`
"La sesión es **STATELESS**: el servidor no guarda estado, la identidad viaja en el JWT. `JwtAuthFilter` (un `OncePerRequestFilter`) lee el header `Authorization: Bearer`, valida el token y coloca la autenticación en el `SecurityContext`. Por eso desactivo CSRF de formulario: no hay cookie de sesión en el backend."

## RBAC — `SecurityConfig` + `CustomUserDetailsService`
"Asigno autoridades `ROLE_ADMIN`/`ROLE_USER` en `CustomUserDetailsService`. En `SecurityConfig`, `/api/usuarios` y `GET /api/leads` exigen `hasRole("ADMIN")`. `GET /api/usuarios/{id}` permite ADMIN **o el mismo usuario** (lo verifico en el controller comparando el email autenticado) — esto evita el **IDOR** (OWASP A01)."

## Mensaje genérico — `AuthController.login`
"Ante credenciales malas devuelvo `401` con 'Credenciales incorrectas', sin decir si el email existe. Esto evita la **enumeración de usuarios**."

## Validación de inputs — DTOs (`@NotBlank`, `@Email`, `@Size`) + `@Valid`
"Valido en el borde de la API con anotaciones de Bean Validation. Rechazo datos malformados antes de tocar la lógica o la BD."

## Query parametrizada — JPA
"Uso Spring Data JPA / Hibernate, que genera **consultas parametrizadas** por defecto. No concateno strings en SQL, así evito **SQL Injection** (OWASP A03)."

## CORS explícito — `SecurityConfig.corsConfigurationSource()`
"Permito solo `http://localhost:3000` y `https://*.vercel.app`, con `allowCredentials=true`. Ningún otro origen puede llamar a la API desde el navegador."

## Cookie HttpOnly (frontend) — `app/api/auth/set-cookie/route.ts`
"El JWT lo guardo en una cookie con `HttpOnly` (JavaScript no puede leerla con `document.cookie` → protege contra robo por XSS), `Secure` en producción (solo HTTPS) y `SameSite=Strict` (no viaja en peticiones cross-site → mitiga CSRF). **No uso `localStorage`** justamente porque sería accesible por JS y quedaría expuesto a XSS."

## Rutas protegidas — `middleware.ts`
"El middleware de Next.js intercepta `/dashboard` y `/admin`: sin cookie `auth_token` redirige a `/login`; y si ya estás logueado e intentas `/login`, te manda a `/dashboard`."

## RBAC en el dashboard — `app/dashboard/page.tsx`
"Es un Server Component: lee la cookie del servidor; si el rol es ADMIN consume `GET /api/leads` con el JWT en el header `Authorization` y muestra la tabla; si es USER solo ve su perfil."

## Login: bloqueo de intentos — `app/login/page.tsx`
"Tras 3 intentos fallidos bloqueo el botón 30 segundos en el cliente, lo que ralentiza la fuerza bruta desde el navegador."

## Logout seguro — `app/api/auth/logout/route.ts`
"Elimino la cookie en el **servidor** con `Max-Age=0`. No basta limpiar el estado del cliente: si el token siguiera válido en una cookie, podría reutilizarse."

---

## Mapa OWASP (por si lo preguntan)
- **A01 Broken Access Control:** middleware + RBAC + verificación de propiedad en `/api/usuarios/{id}`.
- **A02 Cryptographic Failures:** bcrypt(12), JWT con clave fuerte en variable de entorno, HTTPS (Vercel/Railway).
- **A03 Injection:** JPA con queries parametrizadas + validación de inputs.
- **A07 Identification & Authentication Failures:** JWT con expiración, mensaje genérico, logout que invalida la cookie, cookie HttpOnly.
