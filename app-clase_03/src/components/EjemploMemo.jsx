// Con este ejemplo se nos muestra que con useMemo, React memoriza el resultado
// de la última ejecución y solo lo vuelve a calcular si de verdad hace falta

import { useMemo, useState } from "react";

export function EjemploMemo({ items }) {
    // filtro guarda lo que el usuario escribe en el input 
    // setFiltro se usa para actualizar ese valor
    const [filtro, setFiltro] = useState("");

    // incluye lo que contiene el texto del filtro, ignorando mayúsculas y minus
        const handleFiltro = () => {
        console.log("Filtrando lista...");
        return items.filter(item => item.toLowerCase().includes(filtro.toLowerCase()))
    }
    //Filtrado que podría costos: se ejecuta solo cuando cambian los items o el filtro
    const itemsFiltrados = useMemo(handleFiltro, [items, filtro])

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <input
                    className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Filtrar…"
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                />
                <ul className="list-disc list-inside">
                    {itemsFiltrados.map((item, i) => (
                        <li key={i} className="py-1">{item}</li>
                    ))}
                </ul>
            </div>
        </>
    )

}