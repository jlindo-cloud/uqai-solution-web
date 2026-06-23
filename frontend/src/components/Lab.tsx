const proyectos = [
  { titulo: "Prototipos", desc: "Pruebas de concepto rapidas con modelos de IA." },
  { titulo: "Demos", desc: "Demostraciones funcionales para clientes y aliados." },
  { titulo: "Investigacion aplicada", desc: "Proyectos de investigacion con impacto real." },
  { titulo: "Proyectos con estudiantes", desc: "Colaboracion universitaria y semilleros." },
  { titulo: "Comunidad de IA", desc: "Eventos, charlas y comunidad tech peruana." },
];

export default function Lab() {
  return (
    <section id="lab" className="bg-[#0a0a1a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">UQ AI Lab</h2>
        <p className="text-gray-400 text-center mb-16">Donde nacen las ideas y prototipos.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div key={p.titulo} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-purple-600 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">{p.titulo}</h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
