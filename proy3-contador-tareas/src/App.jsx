import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroValor, setFiltroValor] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [primeraCarga, setPrimeraCarga] = useState(true);

  // Leer tareas del localStorage al iniciar
  useEffect(() => {
      const almacen = localStorage.getItem("tareas");
      const tareasGuardadas = almacen ? JSON.parse(almacen) : [];

      setTimeout(() => {
        setTareas(tareasGuardadas);
      }, 2000);
  }, []);

  // Persistir en localStorage al cambiar items, pero saltando la primera vez
  useEffect(() => {
      if (primeraCarga) {
          setPrimeraCarga(false);
          return;
      }
      localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas, primeraCarga]);


  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [tareas]);  // Se ejecuta cada vez que las tareas cambian

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        timestamp: Date.now()
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const tareasFiltradas = useMemo(
    () => {
    
    if (tipoFiltro === 'duracion'){
      return tareas.filter((i) => 
        i.duracion.toString().includes(filtroValor)
    );}

    //Date.now() guarda los valores en milisegundos, 
    // por eso los transformamos 3 min a milisec
    else if (tipoFiltro === 'recientes'){
      const ahora = Date.now();
      return tareas.filter((i) =>
        ahora - i.timestamp <= 3 * 60 * 1000 
    );
    }

    return tareas; // en el caso de "todas"
  }, [tareas, filtroValor, tipoFiltro]);  
  //valores que, cuando cambien, harán que se recalcule el valor

  return (
  <div className="max-w-xl mx-auto p-4 font-sans">
    <h1 className="text-2xl font-bold mb-4">Contador de Tareas</h1>

    {/* Formulario para agregar tarea */}
    <div className="mb-4 space-y-2">
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nombre de la tarea"
        className="w-full px-3 py-2 border rounded"
      />
      
      <input
        type="number"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        placeholder="Duración en minutos"
        className="w-full px-3 py-2 border rounded"
      />
      
      <button
        onClick={agregarTarea}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar tarea
      </button>
    </div>

    {/* Sección de filtro */}
    <section className="mb-4 space-y-2">
      <label className="block font-medium">Filtrar por:</label>
      <select
        value={tipoFiltro}
        onChange={(e) => setTipoFiltro(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="todas">Mostrar todas</option>
        <option value="duracion">Duración específica</option>
        <option value="recientes">Agregadas recientemente</option>
      </select>

      {tipoFiltro === 'duracion' && (
        <input
          type="text"
          value={filtroValor}
          onChange={(e) => setFiltroValor(e.target.value)}
          placeholder="Ej: 10"
          className="w-full px-3 py-2 border rounded"
        />
      )}
    </section>

    {/* Lista filtrada */}
    <section>
      {tareasFiltradas.length === 0 ? (
        <p className="text-center text-gray-500">No hay tareas que coincidan.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {tareasFiltradas.map((item, idx) => (
            <li key={idx} className="px-2 py-1">
              {item.nombre}: {item.duracion} minutos
            </li>
          ))}
        </ul>
      )}
    </section>

      <h3 className="mt-6 font-semibold">Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  );
}

export default App;
