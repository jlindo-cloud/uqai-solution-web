// app/api/auth/set-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, rol } = await req.json();
  const res = NextResponse.json({ ok: true });

  // PROGRAMACION SEGURA: el JWT se guarda en una cookie HttpOnly.
  // JavaScript del navegador NO puede leerla con document.cookie -> previene robo via XSS.
  // NO usamos localStorage justamente porque es accesible por JS y quedaria expuesto a XSS.
  res.cookies.set("auth_token", token, {
    httpOnly: true,                                  // CRITICO: JS no puede acceder
    secure: process.env.NODE_ENV === "production",   // solo HTTPS en produccion
    sameSite: "strict",                              // CSRF: no viaja en requests cross-site
    maxAge: 86400,                                   // 24 horas
    path: "/",
  });

  // El rol NO es secreto: puede leerlo el JS para mostrar UI condicional.
  res.cookies.set("user_rol", rol, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: 86400,
    path: "/",
  });

  return res;
}
