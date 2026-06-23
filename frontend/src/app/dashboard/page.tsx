// app/dashboard/page.tsx — Server Component (RBAC)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getLeads(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const rol = cookieStore.get("user_rol")?.value;

  // Doble verificacion (el middleware ya redirige, pero por si acaso).
  if (!token) redirect("/login");

  // RBAC: solo ADMIN consume la lista completa de leads.
  const leads = rol === "ADMIN" ? await getLeads(token) : [];

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Panel {rol === "ADMIN" ? "Administrador" : "Usuario"}
          </h1>
          <form action="/api/auth/logout" method="POST">
            <button className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg">
              Cerrar Sesion
            </button>
          </form>
        </div>

        {rol === "ADMIN" && (
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-xl text-white font-semibold">
                Leads recibidos ({leads.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead className="bg-gray-800 text-xs uppercase text-gray-400">
                  <tr>
                    {["Nombre", "Email", "Empresa", "Mensaje", "Fecha"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {leads.map((l: any) => (
                    <tr key={l.id} className="hover:bg-gray-800">
                      <td className="px-4 py-3">{l.nombre}</td>
                      <td className="px-4 py-3">{l.email}</td>
                      <td className="px-4 py-3">{l.empresa ?? "—"}</td>
                      <td className="px-4 py-3 max-w-xs truncate">{l.mensaje}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {l.fechaRegistro
                          ? new Date(l.fechaRegistro).toLocaleDateString("es-PE")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {rol !== "ADMIN" && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400">
              Eres usuario con rol
              <span className="text-blue-400 font-bold mx-1">USER</span>.
              Solo puedes ver tu propio perfil. Contacta al administrador para ampliar permisos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
