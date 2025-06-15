import { useEffect, useState } from "react";

export function EjemploEffect() {
    const [count, setCount] = useState(0);

    /* useEffect(() => {
        setStateX(respAPI.data);
    }, [respAPI]) */

    // SOLO al montar componente 
    useEffect(() => {
        console.log("Solo al montar componente");
    }, [])

    // se ejecuta después de cada render de count
    useEffect(() => {
        console.log("Renderizado o actualización", count);
    }, [count])
    // si se cambia otra cosa que no sea count, este efecto no se activa

    //se ejecuta en cada render, es decir que se debe de ejecutar siempre
    useEffect(() => {
        console.log("Cada renderizado", count)
    })

    useEffect(() => {
        const handleScroll = () => console.log(window.scrollY)
        window.addEventListener("scroll", handleScroll);
        return () => {
            // cleanup al desmontar o antes de re-ejectura
            window.removeEventListener("scroll", handleScroll);
        }
    }, []) // -> una sola vez

    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <p className="text-xl">Count: {count}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setCount(c => c + 1)}
                >
                    +1
                </button>
            </div>
        </>
    )
}