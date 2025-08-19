import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";


const AuthContext = React.createContext();

export const AuthProvider = (props) => {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("EventUser")) || null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {

    if (user) {
      setIsLogin(true);
      setIsAdmin(user.role === "Admin");
    }
  else {

      sessionStorage.removeItem("EventUser");
      setIsLogin(false);
      setIsAdmin(false);
  }

  }, [user]);

  const value = {

    user,
    isLogin,
    isAdmin,
    setUser,
    setIsLogin,
    setIsAdmin,

  }

  return (<AuthContext.Provider value={value}>{props.children}  </AuthContext.Provider>)

}

export const useAuth = () => {
  return useContext(AuthContext);
};