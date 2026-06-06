import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";

import { getEmailHistoryApi } from "../api/emailApi";

const EmailHistoryContext = createContext(null);

export const EmailHistoryProvider = ({ children }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [emails, setEmails] = useState([]);

  const fetchEmailHistory = async () => {
    try {
      setEmailLoading(true);

      const { data } = await getEmailHistoryApi();

      setEmails(data.emails || []);
      return data.emails || [];
    } catch (error) {
      toast.error(error.message || "Failed to fetch email history");
      return [];
    } finally {
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailHistory();
  }, []);

  return (
    <EmailHistoryContext.Provider
      value={{
        emails,
        emailLoading,
        fetchEmailHistory
      }}
    >
      {children}
    </EmailHistoryContext.Provider>
  );
};

export const useEmailHistory = () => useContext(EmailHistoryContext);