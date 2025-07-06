import { Link } from "react-router-dom";
import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { UserAvatar } from "./UserAvatar";


export const TweetCard = memo(({ tweet, onLike, onRetweet, onReplie, onViewDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isReplie, setIsReplie] = useState(false);

  // ⚠️ BEST PRACTICE: las dependencias incluyen sólo lo necesario.
  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();  /* previene que se dispare onClick del contenedor */
      setIsLiked((prev) => {
        const next = !prev;
        onLike(tweet.id, next);
        return next;
    });
    }, [tweet.id, onLike]
  );

  const handleRetweet = useCallback(
    (e) => {
      e.stopPropagation();
      setIsRetweeted((prev) => {
        const next = !prev;
        onRetweet(tweet.id, next);
        return next;
    });
  },    
    [tweet.id, onRetweet]
  );

  const handleReplie = useCallback(
    (e) => {
      e.stopPropagation();
      setIsReplie((prev) => {
        const next = !prev;
        onReplie(tweet.id, next);
        return next;
      });
    },
    [tweet.id, onReplie]
  );

  return (
    <motion.div
      className="border-b border-gray-200 p-6 bg-white hover:bg-gray-50 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onViewDetail(tweet.id)}
    >
      <div className="flex gap-3">
        <UserAvatar avatar={tweet.avatar} size="md" alt={`${tweet.user} avatar`} /> 
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link 
              to={`/profile/${tweet.user}`} 
              className="font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
              >
              @{tweet.user}
            </Link>
            <span className="text-gray-500 text-sm">
              {new Date(tweet.timestamp).toLocaleString()} {/* fecha/hora formateada */}
            </span>
          </div>
          <p className="text-gray-900 mb-3 leading-relaxed">{tweet.text}</p>
          <div className="flex items-center gap-6 text-gray-500">
            {/* Botones de interacción */}
            <button
              aria-label = "Dar like al tweet"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              <motion.span
                key={isLiked} // fuerza reinicio de animación al cambiar estado
                animate={{ scale: isLiked ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                ❤️
              </motion.span>
              <span className="text-sm">{tweet.likes}</span>
            </button>

            <button
              aria-label = "Retweetear"
              onClick={handleRetweet}
              className={`flex items-center gap-1 ${isRetweeted ? 'text-green-500' : 'hover:text-green-500'}`}
            >
              <motion.span
                key={isRetweeted}
                animate={{ scale: isRetweeted ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                🔄
              </motion.span>
              <span className="text-sm">{tweet.retweets}</span>
            </button>
            
            <button 
              aria-label = "Replie"
              onClick={handleReplie}
              className={`flex items-center gap-1 ${isReplie ? 'text-blue-400' : 'hover:text-blue-500'} `}
            >
              <motion.span
                key={isReplie}
                animate={{ scale: isReplie ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                 💬
              </motion.span>
               
              <span className="text-sm">{tweet.replies}</span>
            </button>

            <button className="flex items-center gap-1 hover:text-blue-500">📤</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});