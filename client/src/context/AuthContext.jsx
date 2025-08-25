import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";


const AuthContext = React.createContext();

export const AuthProvider = (props) => {

  const savedUser = JSON.parse(sessionStorage.getItem("EventUser")) || null;
  const [user, setUser] = useState(savedUser);
  const [isLogin, setIsLogin] = useState(!!savedUser);
  const [isAdmin, setIsAdmin] = useState(savedUser?.role === "Admin");



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