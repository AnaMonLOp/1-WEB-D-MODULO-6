/* Esto es en base a la clase 7 de DEV.F -> Manejo de rutas con: react-router-dom */
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="bg-yellow-300 p-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold">Mi Clínica</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Inicio</Link>
            <Link to="/citas" className="hover:underline">Ver Citas</Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/cita/:id" element={<CitaDetalle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;


/* Notas:
Link: se usa en lugar de <a> para navegar sin recargar la página.
Routes: un contenedor para definir diferentes Routes.
Route: define una ruta individual.
--> :id es un parámetro dinámico para mostrar detalles específicos.
--> * Ruta comodín: se muestra si no coincide ninguna ruta */