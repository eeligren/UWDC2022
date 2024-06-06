import {createContext, useContext, useEffect, useState} from "react";
import api from "../utils/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
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
        setLoading(true);
        try {
            await api.delete('/logout');
            console.log('logout')
            localStorage.setItem('token', '');
            setUser(null);
            setLoading(false);
            return true
        } catch (e) {
            console.log(e)
            setLoading(false);
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
            console.log(e)
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
