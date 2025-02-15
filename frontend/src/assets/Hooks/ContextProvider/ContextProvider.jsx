import React, { createContext, useState } from 'react'
const loginContext = createContext();
const userContext = createContext();
const urlContext = createContext();

export default function ContextProvider({ children }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLogged, setIslogged] = useState(false);
    const backendUrl = "http://localhost:4000"

    function toggleLogin() {
        setIsLoginOpen(!isLoginOpen)
    }
    return (
        <loginContext.Provider value={{ isLoginOpen, setIsLoginOpen, toggleLogin }} >
            <userContext.Provider value={{ user, setUser }} >
                <urlContext.Provider value={{ backendUrl }} >
                    {children}
                </urlContext.Provider>
            </userContext.Provider>
        </loginContext.Provider>
    )
}

export { loginContext, userContext, urlContext }