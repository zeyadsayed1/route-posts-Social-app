import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthUserContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData(response.data.data.user);
      return response.data.user;
    } catch (error) {
      setUserData(null);
      return null;
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  function logOut() {
    localStorage.clear();
    setUserData(null);
  }

  const userToken = { userData, setUserData, getUserData, logOut };
  return (
    <AuthUserContext.Provider value={userToken}>
      {children}
    </AuthUserContext.Provider>
  );
}