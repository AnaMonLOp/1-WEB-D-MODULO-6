import { useState } from 'react'

function Tarjeta({ titulo, descripcion }) {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className="max-w-sm p-4 m-2 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-black">{titulo}</h3>
                <p className="mt-1 text-gray-600">{descripcion}</p>
                <button onClick={() => setCount((count) => count + 1)}> count is {count}
                </button>
            </div>
        </>
    )
}

export default Tarjeta;