import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";

import {
  loginApi,
  registerApi,
  googleLoginApi,
  getMeApi,
  logoutApi
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await getMeApi();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const register = async (formData) => {
    const { data } = await registerApi(formData);
    setUser(data.user);
    toast.success("Registered successfully");
    return data;
  };

  const login = async (formData) => {
    const { data } = await loginApi(formData);
    setUser(data.user);
    toast.success("Login successful");
    return data;
  };

  const googleLogin = async (credential) => {
    const { data } = await googleLoginApi(credential);
    setUser(data.user);
    toast.success("Google login successful");
    return data;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        register,
        login,
        googleLogin,
        logout,
        fetchMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);