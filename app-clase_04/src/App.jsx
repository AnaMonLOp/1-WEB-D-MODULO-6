import { TweetCard } from './components/TweetCard'

function App() {

 /*  useEffect(()=>{
    // 1) Montaje (y/o cada actualización si no hubiera dependencias)
    console.log("Se montó o actualizó el componente APP")

    // 2) (Opcional return: limpieza antes de desmontar o antes de re-ejecutar efecto)
    return ()=>{
      console.log("Se desmotó o antes de la proxima actualización");
    };
  }, []) */

  return (
    <>
      <TweetCard name="Ronan Monroy" usuario="ronanMonroy123" contenido="Empezando la nueva serie de Netflix!! #juegoDelCalamar" />
    </>
  )
}

export default App