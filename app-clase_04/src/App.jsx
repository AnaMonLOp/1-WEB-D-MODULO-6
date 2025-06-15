/* import { useState, useEffect } from 'react' */
import './App.css'
import { Timer } from './components/Timer'

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
      <Timer />
    </>
  )
}

export default App
