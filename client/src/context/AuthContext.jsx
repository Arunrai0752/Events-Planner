import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";


const AuthContext = React.createContext();

export const AuthProvider = (props) => {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("EventUser")) || null );
    const [isLogin, setISLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => { }, []);

    const value = {

        user,
        isLogin,
        isAdmin,
        setUser,
        setISLogin,
        setIsAdmin,

    }

    return (<AuthContext.Provider value={value}>{props.children}  </AuthContext.Provider>)

}

export const useAuth = () => {
  return useContext(AuthContext);
};