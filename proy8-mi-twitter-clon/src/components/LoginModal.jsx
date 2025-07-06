import { useState, useEffect, useRef } from "react";
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export function LoginModal ({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const inputRef = useRef(null);

  // useEffect → enfoca el input cuando el modal se abre (ciclo de vida: mount).
  useEffect(() => {
    if (isOpen) { 
      setUsername('');
      setPassword('');
      setError('');
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleLogin = () =>{
    if(!username.trim() || !password.trim()){
      setError("Usuario y contraseña requeridos.");
      return;
    }
  
  const result = login(username.trim(), password.trim());

  if(result.success){
    onClose();
  } else {
    setError(result.error || "Error desconocido.");
    }
  };

  if(!isOpen) return null;

  return (
    <motion.div
      /* Backdrop */
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} /* Clic en el fondo cierra el modal */
    >
      <motion.div
        /* Caja modal*/
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <input
          ref={inputRef}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)} /* Realiza la acción si presionamos Enter */
          placeholder="Ingresa tu contraseña de usuario"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {error && (<p className="text-red-500 text-sm mb-2 text-center">{error}</p>)}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleLogin}
            disabled={!password.trim()}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Entrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
