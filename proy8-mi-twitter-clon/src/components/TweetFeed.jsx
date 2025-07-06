import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TweetCard } from './TweetCard';

export const TweetFeed = ({ tweets, onLike, onRetweet, onReplie, onViewDetail }) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // useMemo evita trabajo pesado si tweets no cambian.
  const processedTweets = useMemo(() => {
    const filtered = tweets.filter((t) =>
      [t.text, t.user].some((field) => field.toLowerCase().includes(query.toLowerCase()))
    );
 
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp - a.timestamp;
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'popular':
          return b.likes + b.retweets - (a.likes + a.retweets);
        default:
          return 0;
      }
    });
  }, [tweets, query, sortBy]);

  // 👀 EJERCICIO: loggear processedTweets.length y ver cómo cambia.
  //console.log(processedTweets.length);

  return (
    <div>
      {/* UI de búsqueda + orden */}
      <div className="border-b border-gray-200 p-4 bg-white space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tweets o usuarios…"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="popular">Más populares</option>
          </select>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {processedTweets.length} tweet{processedTweets.length !== 1 ? 's' : ''} 
          </span>
        </div>
      </div>

      {/* Listado */}
      <AnimatePresence>
        {processedTweets.length === 0 ? (
          <motion.div className="p-8 text-center text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {query ? (
              <>
                <div className="text-4xl mb-2">🔍</div>
                No se encontraron tweets para "{query}"
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🐦</div>
                No hay tweets aún. ¡Sé el primero!
              </>
            )}
          </motion.div>
        ) : (
          processedTweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onLike={onLike}
              onRetweet={onRetweet}
              onReplie={onReplie}
              onViewDetail={onViewDetail}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};


