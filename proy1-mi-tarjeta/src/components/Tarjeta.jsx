function Tarjeta() {
    //Definimos la información estática de la tarjeta
    const nombre = "Ana Monroy";
    const profesion = "Desarrolladora Web 👨‍💻";
    const mensaje = "¡Bienvenido a mi tarjeta de presentación! 😃";

  // Retornamos el JSX que representa la tarjeta
  return (
    <>
      {/* JSX permite incrustar variables en HTML utilizando llaves {} */}
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl text-center">
      <h2 className="font-bold">{nombre}</h2> 
      <h4>{profesion}</h4>
      <p className="text-gray-600" >{mensaje}</p>
    </div>
    </>
  );
}

export default Tarjeta;