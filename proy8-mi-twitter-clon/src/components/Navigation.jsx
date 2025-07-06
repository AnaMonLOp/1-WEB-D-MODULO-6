import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { UserAvatar } from "./UserAvatar";


export function Navigation() {
    const { user, isAuthenticated, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    
    return (
        <>
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
                <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
                    <NavLink to="/"
                        className="text-2xl font-extrabold text-blue-500 hover:text-blue-600"
                    >
                        MiniX
                    </NavLink>
                    
                    <div className="flex items-center gap-6">
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'font-bold text-blue-500' : 'text-gray-700 hover:text-blue-500'
                            }
                        >
                            Inicio
                        </NavLink>
                        
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate(`/profile/${user.username}`)}
                                    className="flex items-center space-x-2 text-gray-700 font-bold text-blue-500"
                                >
                                    <UserAvatar avatar={user.avatar} size="sm" alt={`${user.username} avatar`} />
                                    <span> {user.username}</span>
                                </button>
                                <button
                                    onClick={logout}
                                    className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="px-4 py-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                            >
                                Iniciar Sesión
                            </button>
                        )}
                    </div>
                </nav>
            </header>

            {/* Modal de login controlado por estado */}
            <AnimatePresence>
                {showLoginModal && (
                    <LoginModal isOpen onClose={() => setShowLoginModal(false)} />
                )}
            </AnimatePresence>
        </>
    );
};