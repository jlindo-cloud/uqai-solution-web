"use client";
import { useState } from "react";
import axios from "axios";

// Formulario de contacto (Lead). Envia los datos al backend: POST /api/leads (publico).
export default function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", telefono: "", mensaje: "" });
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, form);
      setEstado("ok");
      setForm({ nombre: "", email: "", empresa: "", telefono: "", mensaje: "" });
    } catch {
      setEstado("error");
    }
  };

  return (
    <section id="contacto" className="bg-[#0c0c1f] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Conversemos</h2>
        <p className="text-gray-400 text-center mb-12">
          Cuentanos tu proyecto y un especialista te contactara.
        </p>

        <form onSubmit={onSubmit} className="space-y-4 bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="nombre" value={form.nombre} onChange={onChange} required placeholder="Nombre"
              className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none" />
            <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email"
              className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none" />
            <input name="empresa" value={form.empresa} onChange={onChange} placeholder="Empresa"
              className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none" />
            <input name="telefono" value={form.telefono} onChange={onChange} placeholder="Telefono"
              className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none" />
          </div>
          <textarea name="mensaje" value={form.mensaje} onChange={onChange} required placeholder="Mensaje" rows={4}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none" />

          <button type="submit" disabled={estado === "enviando"}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all disabled:opacity-50">
            {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {estado === "ok" && <p className="text-green-400 text-center text-sm">¡Gracias! Tu mensaje fue enviado.</p>}
          {estado === "error" && <p className="text-red-400 text-center text-sm">No se pudo enviar. Intenta de nuevo.</p>}
        </form>
      </div>
    </section>
  );
}
