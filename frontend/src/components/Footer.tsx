export default function Footer() {
  return (
    <footer className="bg-[#06060f] border-t border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-black text-xl mb-2">UQ <span className="text-blue-400">AI</span> Solution</h3>
          <p className="text-gray-500 text-sm">Inteligencia Artificial para el Peru y el Mundo. Lima, Peru.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Enlaces</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li><a href="#servicios" className="hover:text-white">Servicios</a></li>
            <li><a href="#academia" className="hover:text-white">Academia</a></li>
            <li><a href="#lab" className="hover:text-white">Lab</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Redes</h4>
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">X</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-gray-600 text-sm">
        © 2026 UQ AI Solution Company. Todos los derechos reservados. · Aviso legal · Privacidad
      </div>
    </footer>
  );
}
