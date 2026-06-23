// components/Hero.tsx
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(26,115,232,0.15) 0%, transparent 60%)," +
          "radial-gradient(ellipse at 80% 20%, rgba(103,58,183,0.12) 0%, transparent 60%)," +
          "#0a0a1a",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-blue-300 text-sm">Inteligencia Artificial para el Peru y el Mundo</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          UQ AI{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Solution
          </span>
          <br />Company
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Transformamos empresas peruanas con Inteligencia Artificial: agentes,
          chatbots, automatizacion y formacion especializada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#servicios"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all text-lg"
          >
            Explorar Servicios →
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white rounded-xl transition-all text-lg"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
}
