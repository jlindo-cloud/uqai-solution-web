"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#academia", label: "Academia" },
    { href: "#lab", label: "Lab" },
    { href: "#contacto", label: "Contacto" },
  ];
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-white font-black text-xl">
          UQ <span className="text-blue-400">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-gray-300 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
            Iniciar Sesion
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a1a] border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-300 hover:text-white">
              {l.label}
            </a>
          ))}
          <Link href="/login" onClick={() => setOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center">
            Iniciar Sesion
          </Link>
        </div>
      )}
    </nav>
  );
}
