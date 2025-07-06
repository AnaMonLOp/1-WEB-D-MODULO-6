import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { getUsers, saveUsers, saveCurrentUser, getCurrentUser} from '../utils/storage';

const AuthContext = createContext(null);

// Es una función pura
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    case 'UPDATE_USER':
      return {...state, user: action.user};
    default:
      return state; 
  }
};

// Componente proveedor (Provider) – envuelve a <App/>. Similar al RouteProvider
export function AuthProvider({ children }){
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  // useCallback -> la identidad de la función sólo cambia cuando cambie dispatch.
  const login = useCallback((username, password) => {
    const users = getUsers();
    const existingUser = users.find((u) => u.username === username);

    // Si el usuario no existe, se registra uno nuevo
    if(!existingUser){
      const newUser = {
        username,
        password, 
        avatar:`https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`,
        bio:"",
        followers:[],
        following: [],
        joinedAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      saveCurrentUser(newUser);
      dispatch({ type: 'LOGIN', user: newUser });
      return {success: true, isNew: true};
    }

    // Si existe usuario se verifica contraseña
    if (existingUser.password === password){
      saveCurrentUser(existingUser);
      dispatch({type: 'LOGIN', user: existingUser});
      return {success: true, isNew: false};
    }

    
  if(!username || !password){
    return {success: false, error: "Faltan datos de inico de sesión. "};
  }
    // Contraseña incorrecta
    return { success: false, error:"Contraseña incorrecta."};
  }, []);


  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    dispatch({ type: 'LOGOUT' })
  }, []);

  const updateUser = useCallback((updateUser) => {
    saveCurrentUser(updateUser);
    dispatch({ type: 'UPDATE_USER', user: updateUser});
  }, []);

  // Mantener sesión si recargan la página
  useEffect(() => {
    const storedUser = getCurrentUser();
    if(storedUser){
      dispatch({type:"LOGIN", user:storedUser});
    }
  }, []);


  // ⚠️ BEST PRACTICE: Memoizar el value si fuera un objeto con refs grandes.
  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
};