import React, { useState, useEffect, useRef } from 'react';

export function Bitacora() {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Validación del Formulario! */
    if(nombre.trim().length < 3){
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if(descripcion.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      return;
    }

    if(imagen){
      const tipoImgPermitido = ['image/jpeg', 'image/png', 'image/webp'];
      const tamañoMax = 2 * 1024 * 1024; //2 MB

      if(!tipoImgPermitido.includes(imagen.type)){
        setError('La imagen debe de ser JPG, PNG o WEBP.');
        return;
      }

      if(imagen.size > tamañoMax){
        setError('La imagen debe pesar menos de 2 MB.');
        return;
      }
    }

    setError('');

    const NuevosMundos = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : (modoEdicion ? planetas[indiceEdicion].imagen : null),
    };

    /* Editando un planeta */
    if (modoEdicion) {
        const nuevosPlanetas = [...planetas];
        nuevosPlanetas[indiceEdicion] = NuevosMundos;
        setPlanetas(nuevosPlanetas);
        setModoEdicion(false);
        setIndiceEdicion(null);
    }
    /* Agregando un nuevo planeta */
    else { 
        setPlanetas([...planetas, NuevosMundos]);
    }

    setNombre('');
    setDescripcion('');
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = ''; // Limpiar el input de imagen
    }
  };

  const handleDelete = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
  };

  const handleEdit = (index) => {
    const planeta = planetas[index];
    setNombre(planeta.nombre);
    setDescripcion(planeta.descripcion);
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = ''; // Limpiar el input de imagen
    }

    setIndiceEdicion(index);
    setModoEdicion(true);
  };


  return (
    <>
      <h1 className="text-4xl font-bold text-purple-300 mb-6 text-center drop-shadow-md">🚀 Bitácora de Exploración</h1>

      <form onSubmit={handleSubmit}
       className="bg-purple-950 bg-opacity-40 p-6 rounded-lg shadow-lg space-y-4 max-w-xl mx-auto border border-purple-500"
      >

        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full p-2 rounded bg-purple-800 text-white placeholder-purple-300 border border-purple-600 focus:outline-none"
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="w-full p-2 rounded bg-purple-800 text-white placeholder-purple-300 border border-purple-600 focus:outline-none"
        />
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
          className="w-full text-purple-300"
        />

        {error && (
          <div className="bg-red-700 text-white text-sm p-2 rounded">
            ⚠️ {error}
          </div>
        )}

        <button type="submit"
         className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition duration-300"
        > {modoEdicion ? 'Guardar cambios': 'Agregar Planeta'}</button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 text-purple-200 mb-4">🪐 Planetas Registrados</h2>
      <ul className="grid md:grid-cols-2 gap-6">
        {planetas.map((planeta, index) => (
          <li key={index} className="bg-purple-900 p-4 rounded-lg shadow-md border border-purple-600">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-purple-100">{planeta.nombre}</h3>
            </div>
            
            <p className="text-purple-300">{planeta.descripcion}</p>
            {planeta.imagen && ( 
              <img src={planeta.imagen} alt={planeta.nombre} className="mt-2 rounded w-full h-40 object-cover" /> 
            )}
            
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleDelete(index)} 
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded">
                Eliminar
              </button>
              
              <button onClick={() => handleEdit(index)}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded">
                Editar
              </button>
            </div> 
          </li>
        ))}
      </ul>
    </>
  );
}
