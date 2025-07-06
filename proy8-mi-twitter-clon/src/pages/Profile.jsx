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
  const { updateUser} = useAuth();
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const [userTweets, setUserTweets] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    //Obtener tweets del usuario
    setProfileData(null);
    const allTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    const userSpecificTweets = allTweets.filter(
      (t) => t.user === username
    );
    setUserTweets(userSpecificTweets);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(u => u.username === username);
    setProfileData(userFound || null);
  }, [username]);

  useEffect(() => {
    if (!currentUser || !profileData) return;
    setIsFollowing(currentUser.following?.includes(username));
  }, [currentUser, profileData, username]);

  if(!profileData){
    return (
      <div className="p-8 text-center text-gray-500">
        Cargando perfil ...
      </div>
    );
  }

  const handleFollowToggle = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = allUsers.map((userObj) => {
      if (userObj.username === currentUser.username) {
        // yo: actualizo siguiendo
        const followingSet = new Set(userObj.following || []);
        isFollowing ? followingSet.delete(username) : followingSet.add(username);
        return { ...userObj, following: Array.from(followingSet) };
      }
      if (userObj.username === username) {
        // el perfil visitado: actualizo seguidores
        const followersSet = new Set(userObj.followers || []);
        isFollowing ? followersSet.delete(currentUser.username) : followersSet.add(currentUser.username);
        return { ...userObj, followers: Array.from(followersSet) };
      }
      return userObj;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Actualiza localmente
    const updatedProfile = updatedUsers.find(u => u.username === username);
    const updatedCurrent = updatedUsers.find(u => u.username === currentUser.username);

    setProfileData(updatedProfile);
    updateUser(updatedCurrent); // desde AuthContext
    setIsFollowing(!isFollowing);
  };


  const handleSaveProfile = (updatedProfile) => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.username === updatedProfile.username ? updatedProfile : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);

    const allTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    const updatedTweets = allTweets.map((t) =>
      t.user === updatedProfile.username ? { ...t, avatar: updatedProfile.avatar } : t
    );
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
    setUserTweets(updatedTweets.filter((t) => t.user === updatedProfile.username));
    updateUser(updatedProfile);
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
                  <strong>{profileData.following?.length || 0}</strong>{' '}
                  <span className="text-gray-600">Siguiendo</span>
                </span>
                <span>
                  <strong>{profileData.followers?.length || 0}</strong>{' '}
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
                {!isOwnProfile && (
                  <button
                    onClick={handleFollowToggle}
                    className={`mt-4 px-6 py-2 rounded-full font-semibold ${
                      isFollowing
                        ? "bg-white border border-blue-500 text-blue-500 hover:bg-blue-50"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isFollowing ? "Siguiendo" : "Seguir"}
                  </button>
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
              onReplie={() => {}}
              onViewDetail={() => {}}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};
