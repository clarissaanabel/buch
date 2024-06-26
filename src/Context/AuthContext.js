import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (accessToken) => {
        setIsLoggedIn(true);
        localStorage.setItem("accessToken", accessToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
