import { useState } from 'react';

function InputNumber({onEnviar}) {
  const [num, setNum] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onEnviar(Number(num));
        setNum('');
    }

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-2 mt-4"
    >
         <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          required
          className="w-32 p-2 rounded border-2 border-yellow-400 bg-yellow-50 text-yellow-900 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center"
        />

        <button
        type="submit"
        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded shadow-md transition"
        >
         Enviar
        </button>

    </form>
  );
}

export default InputNumber;