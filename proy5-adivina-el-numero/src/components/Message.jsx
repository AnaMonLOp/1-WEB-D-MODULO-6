function Message({ resultado }) {
  return (
    <p className="mt-6 text-xl font-semibold text-yellow-800 animate-pulse">
      {resultado === '' 
        ? 'Intenta adivinar el número entre 1 y 100 😁' 
        : resultado}
    </p>
  );
}

export default Message;

