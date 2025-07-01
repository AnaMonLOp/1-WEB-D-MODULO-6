/* Pendiente de ver  */

import { useRef, useEffect } from "react";

export function ScrollTracker() {
    const scrollPos = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
           /* Guarda la posición del scroll en scrollPos */
            scrollPos.current = window.scrollY;
            console.log('Scroll actual: ', scrollPos.current);
            console.log('Window: ', window.scrollY);
        }
        window.addEventListener('scroll', handleScroll); /* -> Agrega un escuchador de scroll al window */

        /* Al desmontar el componente, quita el event listener para evitar errores o fugas de memoria. */
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) /* -> se ejecuta una sola vez */

    return (
        <div className="h-60 overflow-y-scroll border p-2">
            <div className="h-screen">

            </div>
            <div className="h-screen">

            </div>
            {/* contenido largo */}
        </div>
    )
}