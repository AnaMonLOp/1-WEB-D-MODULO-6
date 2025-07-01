import { useParams } from 'react-router-dom';

function CitaDetalle() {
  const { id } = useParams();

  const citas = [
    { id: 1, nombre: "Consulta general", descripcion: "Revisión médica completa con historial clínico." },
    { id: 2, nombre: "Revisión dental", descripcion: "Evaluación de higiene bucal y limpieza dental." }
  ];

  const cita = citas.find(c => c.id === Number(id));
  
  if (!cita) {
    return <p className="text-red-500">Cita no encontrada</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Detalle de la Cita</h2>
      <p className="text-gray-700 font-bold">{cita.nombre}</p>
      <p className="text-gray-700">ID de la cita: <span className="font-bold">{id}</span></p>
      <p className="mt-2 text-sm text-gray-500">{cita.descripcion}</p>
    </div>
  );
}
export default CitaDetalle;
