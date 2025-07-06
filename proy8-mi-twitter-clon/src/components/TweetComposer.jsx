import {useState, useRef, useEffect, useCallback} from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserAvatar } from '../components/UserAvatar';

export const TweetComposer = ({ onTweet }) => {
  const [text, setText] = useState('');
  const { user, isAuthenticated } = useAuth();
  const inputRef = useRef(null);

  // Focus automático al autenticarse.
  useEffect(() => {
    if (isAuthenticated) inputRef.current?.focus();
  }, [isAuthenticated]);

  const remaining = 280 - text.length;

  const handleSubmit = useCallback(() => {
    if (!text.trim() || remaining < 0) return;
    onTweet(text.trim());
    setText('');
  }, [text, remaining, onTweet]);

  if (!isAuthenticated)
    return (
      <div className="border-b border-gray-200 p-6 bg-white text-center text-gray-500">
        Inicia sesión para crear un tweet
      </div>
    );

  return (
    <motion.div
      className="border-b border-gray-200 p-6 bg-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-3">
        <motion.div
          animate={{
            scale: text ? [1, 1.1, 1] : 1,
            rotate: text ? [0, 3, -3, 0] : 0
          }}
          transition={{
            duration: 0.6,
            repeat: text ? Infinity : 0,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        >
          <UserAvatar avatar={user.avatar} size="lg" alt={`${user.username} avatar`} />
        </motion.div>
        <div className="flex-1">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSubmit()}
            maxLength={280}
            placeholder="¿Qué novedades tienes?"
            className="w-full resize-none outline-none text-lg bg-transparent"
            rows={3}
          />

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {/* contador dinámico */}
              {remaining < 20 && (
                <span className={`text-sm font-medium ${remaining < 0 ? 'text-red-500' : 'text-orange-500'}`}>
                  {remaining} caracteres restantes
                </span>
              )}
              <span className="text-xs text-gray-400">Ctrl+Enter para enviar</span>
            </div>
            <button
              disabled={!text.trim() || remaining < 0}
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"
            >
              Tweetear
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

