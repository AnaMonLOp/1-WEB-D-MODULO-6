import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { TweetCard } from '../components/TweetCard';
import { EditProfileModal } from "../components/EditProfileModal";
import { UserAvatar } from "../components/UserAvatar";


export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const [userTweets, setUserTweets] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    //Obtener tweets del usuario
    const allTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    const userSpecificTweets = allTweets.filter(
      (t) => t.user === username
    );
    setUserTweets(userSpecificTweets);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(u => u.username === username);
    setProfileData(userFound || null);
  }, [username]);

  if(!profileData){
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Perfil no encontrado</p>
      </div>
    );
  }

  const handleSaveProfile = (updateUser) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updateUsers = allUsers.map((u) =>
      u.username === updateUser.username ? updateUser : u
    );
    localStorage.setItem("users", JSON.stringify(updateUsers));
    localStorage.setItem("currentUser", JSON.stringify(updateUser));
    setProfileData(updateUser);

    const allTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    const updatedTweets = allTweets.map((t) =>
      t.user === updateUser.username ? { ...t, avatar: updateUser.avatar } : t
    );
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
    setUserTweets(updatedTweets.filter((t) => t.user === updateUser.username));
  };

  const { avatar, bio, joinedAt } = profileData;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-2xl">
      <div className="bg-white border-b border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline text-sm">
            ← Volver
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <UserAvatar avatar={avatar} size="lg" alt={`Avatar de ${username}`} />
            </motion.div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">@{username}</h1>
              <p className="text-gray-500 mb-3">
                {isOwnProfile ? 'Tu perfil' : `Perfil de ${username}`}
              </p>
              <p className="text-sm text-gray-600 mb-2">{bio || "Sin biografía aún."}</p>
              <p className="text-xs text-gray-400">Miembro desde {new Date(joinedAt).toLocaleDateString()}</p>

              <div className="flex gap-6 text-sm">
                <span>
                  <strong>{userTweets.length}</strong>{' '}
                  <span className="text-gray-600">Tweets</span>
                </span>
                <span>
                  <strong></strong>{' '}
                  <span className="text-gray-600">Siguiendo</span>
                </span>
                <span>
                  <strong></strong>{' '}
                  <span className="text-gray-600">Seguidores</span>
                </span>
              </div>
                {isOwnProfile && (
                  <>
                    <button
                      className="mt-4 px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                      onClick={() => setShowEditModal(true)}
                    >
                      Editar perfil
                    </button>

                    <EditProfileModal
                      isOpen={showEditModal}
                      onClose={() => setShowEditModal(false)}
                      user={profileData}
                      onSave={handleSaveProfile}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 bg-white text-center text-gray-500">
        {userTweets.length === 0 ? (
          <div className="text-4xl mb-3">           
            <p className="text-lg">Los tweets de @{username} aparecerían aquí</p>
            <p className="text-sm mt-2">
              En una implementación real, aquí se cargarían los tweets del usuario
            </p>
          </div>
        ) : ( userTweets 
          .sort((a, b) => b.timestamp -a.timestamp)
          .map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onLike={() => {}}
              onRetweet={() => {}}
              onViewDetail={() => {}}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};
