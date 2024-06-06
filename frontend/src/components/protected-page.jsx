import {useAuth} from "../contexts/authContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router";

export default function ProtectedPage({children}) {
    const { isAuthenticated, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [user, loading]);

    if(loading) {
        return 'Loading...'
    }

    return (
        <>{ children }</>
    );
}
