function RestartButton({ onReset }) {
  return (
    <div className="mt-4 text-center">
      <button
        onClick={onReset}
        className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-6 rounded-full shadow-lg mt-6 transition transform hover:scale-105"
      >
        Reiniciar Juego
      </button>
    </div>
  );
}

export default RestartButton;