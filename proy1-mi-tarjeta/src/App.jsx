import Tarjeta from './components/Tarjeta';

function App() {
  return (
    <>
    <div className="grid place-items-center min-h-screen ">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-center">Tarjeta de Presentación</h1>
        <Tarjeta />
      </div>
    </div>
    </>
  );
}

export default App;