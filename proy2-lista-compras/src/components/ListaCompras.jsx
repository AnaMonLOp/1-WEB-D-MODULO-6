import { useState } from "react";

function ListaCompras() {
  // Definir el estado para la lista de compras
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  const handleInputOnChange = (eve) => {
    setNuevoProducto(eve.target.value);
  }

  // Función para agregar un nuevo producto a la lista
  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      setProductos([...productos, nuevoProducto]);
      setNuevoProducto("");
    }
  };

  // Función para eliminar un producto de la lista
    const eliminarProducto = (index) => {
        setProductos(productos.filter( (producto, i) => i !== index));
  };

/* Me apoyé en el diseño con inteligencia Artificial.*/
  return (
    <>
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Lista de Compras
          </h2>

          <div className="flex gap-2 mb-4">
              <input
                  type="text"
                  value={nuevoProducto}
                  onChange={handleInputOnChange}
                  className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Agregar producto"
              />
              
              <button onClick={agregarProducto} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Agregar
              </button>
          </div>

          <ul className="space-y-2"> {productos.map((producto, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded">
                  <span className="text-gray-800 dark:text-white">{producto}</span>
                  <button onClick={() => eliminarProducto(index)} className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Eliminar
                  </button>
              </li>
            ))}
          </ul>
      </div>
    </>
    );
}

export default ListaCompras;