import {createContext, useContext, useEffect, useState} from "react";
import api from "../utils/axios.js";

const AuthContext = createContext(null);

/*
Auth context, handle authentication app wide
 */
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        if(!localStorage.getItem('token')) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.get('/user');
            setUser(data);
        } catch (e) {
            localStorage.setItem('token', '');
            setUser(null);
        }
        setLoading(false);
    }

    const logout = async () => {
        try {
            await api.delete('/logout');
            localStorage.setItem('token', '');
            setUser(null);
            return true
        } catch (e) {
            return false
        }
    }

    //Login api call
    const login = async (credentials) => {
        try {
            const { data } = await api.post('/login', { email: credentials.email, password: credentials.password });
            localStorage.setItem('token', data.token);
            getUser();
            return true;
        } catch (e) {
            return false
        }
    }

    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user, loading, getUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
