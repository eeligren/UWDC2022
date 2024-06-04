import {createContext, useContext, useEffect, useState} from "react";
import api from "../utils/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const { data } = await api.get('/user');
            setUser(data);
        } catch (e) {
            setUser(null);
            console.log(e)
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
        <AuthContext.Provider value={{isAuthenticated: !!user, user, loading, getUser, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
