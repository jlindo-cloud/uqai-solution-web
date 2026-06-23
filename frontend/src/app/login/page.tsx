"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

/**
 * PROGRAMACION SEGURA:
 * (1) Mensaje de error GENERICO -> no revela si el email existe.
 * (2) Bloqueo de 30s tras 3 intentos -> mitiga fuerza bruta desde el cliente.
 * (3) El JWT se guarda en cookie HttpOnly (via Route Handler), NO en localStorage.
 */
export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [bloqHasta, setBloqHasta] = useState(0);

  const bloqueado = Date.now() < bloqHasta;
  const segsBloq = Math.ceil((bloqHasta - Date.now()) / 1000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bloqueado) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        form,
        { withCredentials: true }
      );
      // Guardar el JWT en cookie HttpOnly mediante el Route Handler del servidor.
      await axios.post("/api/auth/set-cookie", { token: data.token, rol: data.rol });
      router.push("/dashboard");
    } catch {
      const nuevo = intentos + 1;
      setIntentos(nuevo);
      // SEGURIDAD: mensaje generico, no revelar si el email existe.
      setError("Credenciales incorrectas. Verifica tu email y contrasena.");
      if (nuevo >= 3) {
        setBloqHasta(Date.now() + 30000); // bloquear 30 segundos
        setError("Demasiados intentos. Espera 30 segundos.");
        setIntentos(0);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-800 shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center mb-2">UQ AI Solution</h1>
        <p className="text-gray-400 text-center mb-8">Panel de Administracion</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contrasena"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || bloqueado}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Verificando..." : bloqueado ? `Bloqueado (${segsBloq}s)` : "Iniciar Sesion"}
          </button>
        </form>
        <p className="text-gray-500 text-xs text-center mt-6">
          Prueba: admin@uqai.pe / Admin2026! &nbsp;·&nbsp; user@uqai.pe / User2026!
        </p>
      </div>
    </div>
  );
}
