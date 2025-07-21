import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) =>  {

    const [user , setUser] = useState("");
    const [isLogin , setISLogin] = useState(false);
    const [isAdmin , setIsAdmin] = useState(false);

    useEffect(() => {}, []);

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

