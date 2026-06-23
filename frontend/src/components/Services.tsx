const servicios = [
  { icon: "🤖", titulo: "Agentes IA", desc: "Agentes autonomos que automatizan procesos de negocio de extremo a extremo." },
  { icon: "💬", titulo: "Chatbots empresariales", desc: "Asistentes conversacionales integrados a tus canales y datos internos." },
  { icon: "⚙️", titulo: "Automatizacion", desc: "Flujos inteligentes que reducen tareas repetitivas y errores manuales." },
  { icon: "🏪", titulo: "Soluciones para MYPES", desc: "IA accesible y a medida para pequenas y medianas empresas peruanas." },
  { icon: "🏥", titulo: "Salud & Educacion", desc: "Modelos aplicados a diagnostico asistido y aprendizaje personalizado." },
  { icon: "📊", titulo: "Big Data", desc: "Pipelines de datos y analitica para decisiones basadas en evidencia." },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-[#0a0a1a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">UQ AI Solutions</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Servicios de Inteligencia Artificial para impulsar tu empresa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div key={s.titulo} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-600 transition-colors">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{s.titulo}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
