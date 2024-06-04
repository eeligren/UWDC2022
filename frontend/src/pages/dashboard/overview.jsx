import {useAuth} from "../../contexts/authContext.jsx";
import {useNavigate} from "react-router";

export default function OverviewPage() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    if(!user) {
        return navigate('/login');
    }

    return (
        <>owerview {JSON.stringify(user)}</>
    );
}
