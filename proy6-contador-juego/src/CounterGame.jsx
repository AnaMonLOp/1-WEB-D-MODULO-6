import { useReducer, useRef, useCallback, useEffect, useState} from "react";

const initialState = { count: 0, history: [] };

const init = () => {
  const storedState = localStorage.getItem("estadoContador");
  return storedState ? JSON.parse(storedState) : initialState;
};


function reducer(state, action) {
switch (action.type) {
    case "increment":
    return { 
        count: state.count + action.payload, 
        history: [...state.history, `+${action.payload} (Nuevo valor: ${state.count + action.payload})`] 
    };
    case "decrement":
    return { 
        count: state.count - 1, 
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`] 
    };
    case "reset":
    return initialState;

    case "undo":{
        if(state.history.length === 0) return state; 
        
        const lastAction = state.history[state.history.length - 1];
        let newCount = state.count;

        if (lastAction.startsWith("+")) {
            newCount -= Number(lastAction.match(/\+(\d+)/)?.[1] || 1);
        } else if (lastAction.startsWith("-")) {
            newCount += Number(lastAction.match(/-(\d+)/)?.[1] || 1);
        }

        return {
            count: newCount,
            history: state.history.slice(0, -1)
        };
    }

    default:
    return state;
}
}

function CounterGame() {
const [state, dispatch] = useReducer(reducer, initialState, init);
const [inputValue, setInputValue] = useState(1);
const incrementBtnRef = useRef(null);


// Fijar el foco en el botón de incremento al renderizar
useEffect(() => {
  if (incrementBtnRef.current) {
    incrementBtnRef.current.focus();
  }
}, []);

useEffect(() => {
  localStorage.setItem("estadoContador", JSON.stringify(state));
}, [state]);


const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", payload: inputValue });
}, [inputValue]);


const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
}, []);

const handleUndo = useCallback(() =>{
    dispatch({ type: "undo"});
}, []);

return (
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200 font-serif">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contador: {state.count}</h2>

    <div className="flex items-center gap-2 mb-4">
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 w-24 text-right"
      />
      <button
        onClick={handleIncrement}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        +
      </button>
      <button
        onClick={handleDecrement}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        -
      </button>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
      >
        Reset
      </button>
      <button
        onClick={handleUndo}
        disabled={state.history.length === 0}
        className={`px-3 py-1 rounded transition ${
          state.history.length === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-yellow-500 text-white hover:bg-yellow-600"
        }`}
      >
        Deshacer
      </button>
    </div>

    <h3 className="text-lg font-medium text-gray-700 mb-2">Historial de cambios:</h3>
    <ul className="list-disc list-inside text-gray-600 space-y-1">
      {state.history.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </ul>
  </div>
);

}

export default CounterGame;