import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {TweetComposer} from '../components/TweetComposer';
import {TweetFeed} from '../components/TweetFeed';
import { getTweets, saveTweets } from '../utils/storage'; 
import { updateTweetMetric } from '../utils/tweetUtils';


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
    const stored = getTweets();
    return stored.length > 0 ? stored : defaultTweets;
    };

  const [tweets, setTweets] = useState(getInitialTweets);

  //Cada vez que tweets cambie, se actualiza el localStorage  
  useEffect(() => {
    const stored = getTweets();
    if (JSON.stringify(tweets) !== JSON.stringify(stored)){
      saveTweets(tweets);
    }
  }, [tweets]);

  useEffect(() => {
    const syncTweets = () => {
      setTweets(getTweets());
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

  const handleTweetMetric = (field) => (id, isActive) => {
    setTweets(prev => updateTweetMetric(prev, id, field, isActive));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <TweetComposer onTweet={publishTweet} />
      <TweetFeed
        tweets={tweets}
        onLike={handleTweetMetric("likes")}
        onRetweet={handleTweetMetric("retweets")}
        onReplie={handleTweetMetric("replies")}
        onViewDetail={handleViewDetail}
      />
    </motion.div>
  );
};