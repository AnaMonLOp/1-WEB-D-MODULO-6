import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAvatar } from "../components/UserAvatar";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const allTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    const tweet = allTweets.find((t) => t.id.toString() === id);

    if (!tweet) {
        return (
            <div className="p-8 text-center text-gray-500">
                <p>Tweet no encontrado</p>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-white">
        <div className="p-4 border-b border-gray-200">
            <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline text-sm">
            ← Volver
            </button>
        </div>
        <div className="p-6">
            <div className="flex gap-4">
                <UserAvatar avatar={tweet.avatar} size="md" alt={`Avatar de ${tweet.user}`} />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                <span 
                    className="font-bold text-lg hover:underline"
                >
                    @{tweet.user}
                </span>
                <span className="text-gray-500">
                    {new Date(tweet.timestamp).toLocaleString()}
                </span>
                </div>
                <p className="text-xl leading-relaxed mb-6">{tweet.text}</p>
                <div className="flex items-center gap-8 text-gray-600 text-lg border-t border-gray-100 pt-4">
                <span className="flex items-center gap-2">❤️ {tweet.likes}</span>
                <span className="flex items-center gap-2">🔄 {tweet.retweets}</span>
                <span className="flex items-center gap-2">💬 {tweet.replies}</span>
                <span className="flex items-center gap-2">📤</span>
                </div>
            </div>
            </div>
        </div>
    </motion.div>
);
};