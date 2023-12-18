import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSessionData, setUserSessionData] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://52.78.118.198:8080/api/user", {
          withCredentials: true,
        });

        const userData = response.data;
        setUserSessionData(userData.session_id);
        console.log("유저 세션 데이터:", userData);
      } catch (error) {
        console.error("유저 세션 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchUserSession();
  }, []);

  return (
    <UserContext.Provider value={{ userSessionData, setUserSessionData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
