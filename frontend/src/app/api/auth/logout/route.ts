// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 303 fuerza al navegador a hacer GET en el redirect (evita el 405 al volver a /login)
  const res = NextResponse.redirect(new URL("/login", req.url), 303);
  // PROGRAMACION SEGURA: eliminar la cookie en el SERVIDOR (Max-Age=0)
  res.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
  res.cookies.set("user_rol", "", { maxAge: 0, path: "/" });
  return res;
}
