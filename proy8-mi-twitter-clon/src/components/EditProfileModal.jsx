import {useState, useEffect} from "react";
import { motion } from 'framer-motion';
import { UserAvatar } from "./UserAvatar";


export function EditProfileModal({ isOpen, onClose, user, onSave}) {
    const [bio, setBio] = useState (user?.bio || "");
    const [avatar, setAvatar] = useState (user?.avatar || "");

    useEffect(() => {
    if(isOpen){
        setBio(user?.bio || "");
        setAvatar(user?.avatar || "");
    } 
  }, [isOpen, user]);

  const handleClose = () => {
    setBio(user?.bio || "");
    setAvatar(user?.avatar || "");
    onClose();    
  };

  const handleSave = () => {
    const trimmedAvatar = avatar.trim();
    if (!trimmedAvatar) {
      alert("El avatar no puede estar vacío.");
      return;
    }
    onSave({ ...user, bio: bio.trim(), avatar: trimmedAvatar });
    handleClose();
  };

  if(!isOpen) return null;

  return(
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
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfil</h2>
        <label className="text-gray-700">Biografía</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
          rows={3}
        />

        <label className="text-gray-700">Avatar (emoji o URL)</label>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {avatar && (
          <div className="text-center mb-4">
            <UserAvatar avatar={avatar} size="lg" alt="Previsualización de avatar" />
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
        </motion.div>
    </motion.div>
  );
};