import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";

import {
  getGmailAuthUrlApi,
  getGmailStatusApi
} from "../api/gmailApi";
import { useAuth } from "./AuthContext";

const GmailContext = createContext(null);


export const GmailProvider = ({ children }) => {
  const [gmailLoading, setGmailLoading] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailEmail, setGmailEmail] = useState(null);
  const { user } = useAuth();

  const fetchGmailStatus = async () => {
    try {
      setGmailLoading(true);

      const { data } = await getGmailStatusApi();

      setGmailConnected(data.connected);
      setGmailEmail(data.email);

      return data;
    } catch (error) {
      setGmailConnected(false);
      setGmailEmail(null);
      return null;
    } finally {
      setGmailLoading(false);
    }
  };

  useEffect(() => {
  if (user) {
    fetchGmailStatus();
  } else {
    setGmailConnected(false);
    setGmailEmail(null);
  }
}, [user]);

  const connectGmail = async () => {
    try {
      setGmailLoading(true);

      const { data } = await getGmailAuthUrlApi();

      if (data.url) {
        window.location.href = data.url;
      }

      return data.url;
    } catch (error) {
      toast.error(error.message || "Failed to connect Gmail");
      return null;
    } finally {
      setGmailLoading(false);
    }
  };

  return (
    <GmailContext.Provider
      value={{
        gmailLoading,
        gmailConnected,
        gmailEmail,
        fetchGmailStatus,
        connectGmail
      }}
    >
      {children}
    </GmailContext.Provider>
  );
};

export const useGmail = () => useContext(GmailContext);