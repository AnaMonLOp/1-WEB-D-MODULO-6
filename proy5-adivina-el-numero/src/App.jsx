import { useState } from 'react';
import Game from './components/Game';
import InputNumber from './components/InputNumber';
import Message from './components/Message';
import RestartButton from './components/RestartButton'

function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(null);
  const [numeroUsuario, setNumeroUsuario] = useState(null);
  const [resultado, setResultado] = useState('');
  const [gameKey, setGameKey] = useState(0);

  const manejarNumeroGenerado = (numero) => {
      setNumeroSecreto(numero);
      setResultado('');
      setNumeroUsuario(null);
  };

  const manejarNumeroIngresado = (numero) => {
      setNumeroUsuario(numero);

      if (numero === numeroSecreto) {
        setResultado('¡Correcto! Adivinaste el número.');
      } else if (numero < numeroSecreto) {
        setResultado('El número es mayor');
      } else {
          setResultado('El número es menor')
      }
  };

  const reiniciarJuego = () => {
      setGameKey(prev => prev + 1); // fuerza el "remontaje" de Game
      setResultado('');
      setNumeroUsuario(null);
  };


  return (
    <>
      <div className="min-h-screen bg-yellow-100 p-4 text-center">
        <h1 className="text-3xl font-extrabold text-yellow-800 mb-6"> Adivinar el Número 🌤️</h1>
        <Game key={gameKey} onGenerar={manejarNumeroGenerado} />
        <InputNumber onEnviar={manejarNumeroIngresado} />
        <Message resultado={resultado} />
        <RestartButton onReset={reiniciarJuego} />
      </div>
    </>
  );
}

export default App;
