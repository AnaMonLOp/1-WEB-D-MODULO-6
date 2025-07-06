import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {TweetComposer} from '../components/TweetComposer';
import {TweetFeed} from '../components/TweetFeed';


export default function Home () {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const defaultTweets = [
    {
      id: 1,
      user: 'demo_user',
      avatar: '🚀',
      text: 'Bienvenido a MiniX! Este es un tweet de ejemplo…',
      timestamp: Date.now() - 3600000,
      likes: 15,
      retweets: 4,
      replies: 2,
    },
    {
      id: 2,
      user: 'tech_lover',
      avatar: '💻',
      text: 'Acabo de terminar mi proyecto en React con hooks…',
      timestamp: Date.now() - 7200000,
      likes: 23,
      retweets: 7,
      replies: 5,
    }
  ];
  const getInitialTweets = () => {
    try {
      const stored = localStorage.getItem('tweets');
      return stored ? JSON.parse(stored) : defaultTweets;
    } catch(e) {
      console.error('Error al leer tweets del localStorage:', e);
      return defaultTweets;
    }
  };

  const [tweets, setTweets] = useState(getInitialTweets);

  //Cada vez que tweets cambie, se actualiza el localStorage  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tweets') || '[]');
    if (JSON.stringify(tweets) !== JSON.stringify(stored)){
      localStorage.setItem('tweets', JSON.stringify(tweets));
    }
  }, [tweets]);

  useEffect(() => {
    const syncTweets = () => {
      const stored = JSON.parse(localStorage.getItem('tweets') || '[]');
      setTweets(stored);
    };
    window.addEventListener('storage', syncTweets);
    return () => window.removeEventListener('storage', syncTweets);
  }, []);

  const publishTweet = useCallback(
    (text) => {
      if (!isAuthenticated || !user) return;
      if(!text.trim()) return;
      const newTweet = {
        id: Date.now(),
        user: user.username,
        avatar: user.avatar,
        text,
        timestamp: Date.now(),
        likes: 0,
        retweets: 0,
        replies: 0,
      };
      setTweets((prev) => [newTweet, ...prev]);
    },
    [isAuthenticated, user]
  );

  const handleViewDetail = useCallback((id) => {
      navigate(`/tweet/${id}`);
  }, [navigate]);

  const handleLike = useCallback((id, isLiking) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, likes: Math.max(0, t.likes + (isLiking ? 1 : -1)) } : t
      )
    );
  }, []);

  const handleRetweet = useCallback((id, isRetweeting) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, retweets: Math.max(0, t.retweets + (isRetweeting ? 1 : -1)) } : t
      )
    );
  }, []);

  const handleReplie = useCallback((id, isReplie) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, replies: Math.max(0, t.replies + (isReplie ? 1: -1))} : t
      )
    );
  }, []);


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <TweetComposer onTweet={publishTweet} />
      <TweetFeed
        tweets={tweets}
        onLike={handleLike}
        onRetweet={handleRetweet}
        onReplie={handleReplie}
        onViewDetail={handleViewDetail}
      />
    </motion.div>
  );
};