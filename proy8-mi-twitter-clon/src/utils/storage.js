const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// --- USERS ---
export const getUsers = () => getItem("users");
export const saveUsers = (users) => setItem("users", users);

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
};

export const saveCurrentUser = (user) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

// --- TWEETS ---
export const getTweets = () => getItem("tweets");
export const saveTweets = (tweets) => setItem("tweets", tweets);