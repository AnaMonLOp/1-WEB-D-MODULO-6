import React, { useState, useEffect, useMemo } from 'react';
import { Planeta } from './components/Planeta'
import { Bitacora } from './components/Bitacora';

function App() {
  // ... (estado)
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]); 

  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje

    const intervalo = setInterval(() => { // Montaje
      // ... (simulación de vuelo)
      setDistancia(d => Math.min (d+8, 800));
      setCombustible(s => Math.max(s-1, 0));
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel se ha apagado."); // Desmontaje
    };
  }, []);


  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => {
    setEstadoNave("Aterrizando");
    const nuevoPlaneta = `Planeta - B${planetasVisitados.length + 1}`;
    setPlanetasVisitados((prev) => [...prev, nuevoPlaneta]);
  }

  return (
     <> 
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white font-sans p-8">
          <div className="p-6 bg-purple-950 bg-opacity-50 rounded-xl shadow-xl text-center border border-purple-700 text-white max-w-3xl mx-auto mt-10">
            <p className="text-2xl mb-2">🌌 Distancia: <span className="text-purple-300">{distancia} km</span></p>
            <p className="text-2xl mb-2">🚀 Combustible: <span className="text-purple-300">{combustible} L</span></p>
            <p className="text-xl italic mb-4">{mensajeEstado}</p>
            
            <button
              className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-full transition mt-4"
              onClick={aterrizar}> 
              Aterrizar </button>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-200">🪐 Planetas visitados:</h3>
              <div className="flex flex-col gap-1 mt-2">
                {planetasVisitados.length === 0 ? ( <p className="text-purple-400">Ninguno</p>) 
                : (planetasVisitados.map((nombre, index) => ( <Planeta key={index} nombre={nombre} />))
                )}
              </div>
            </div>
            <Bitacora />
          </div>
         </div>
      </>
   );
}
export default App;
