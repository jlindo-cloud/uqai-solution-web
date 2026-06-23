// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url));
  // PROGRAMACION SEGURA: eliminar la cookie en el SERVIDOR (Max-Age=0).
  // No basta con limpiar el estado del cliente.
  res.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
  res.cookies.set("user_rol", "", { maxAge: 0, path: "/" });
  return res;
}
