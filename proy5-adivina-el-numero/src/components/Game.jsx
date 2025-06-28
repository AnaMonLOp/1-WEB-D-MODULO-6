import React, { useEffect} from 'react';

function Game({onGenerar}) {

  useEffect ( () => {
    console.log("Game ha iniciado");

    const aleatorio = Math.floor(Math.random() * 100) + 1;
    onGenerar(aleatorio);
    console.log(aleatorio);
  }, []
)

  return (
    <div className="mt-4 text-yellow-700 font-medium italic">
      <h1 className="text-lg">¡Número secreto generado! 🤫</h1>
    </div>
  );
}

export default Game;
