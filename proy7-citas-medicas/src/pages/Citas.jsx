import { Link } from 'react-router-dom';

function Citas() {
  const citas = [
    { id: 1, nombre: "Consulta general" },
    { id: 2, nombre: "Revisión dental" }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Citas</h2>
      <ul className="space-y-2">
        {citas.map(cita => (
          <li key={cita.id} className="bg-white shadow rounded p-3 hover:bg-yellow-100 transition">
            <Link to={`/cita/${cita.id}`} className="font-medium text-blue-600 hover:underline">
              {cita.nombre} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Citas;

