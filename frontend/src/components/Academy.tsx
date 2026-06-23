const cursos = [
  "Machine Learning aplicado", "RAG y bases vectoriales", "LLM y prompt engineering",
  "Agentes inteligentes", "Programacion Segura", "Big Data", "Cloud Computing",
];

export default function Academy() {
  return (
    <section id="academia" className="bg-[#0c0c1f] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">UQ AI Academy</h2>
        <p className="text-gray-400 text-center mb-16">Formacion especializada en IA y desarrollo seguro.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursos.map((c) => (
            <div key={c} className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-800/40 rounded-xl p-5 flex items-center gap-3">
              <span className="text-blue-400 text-2xl">▸</span>
              <span className="text-white">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
