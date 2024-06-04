import {Outlet, useNavigate} from "react-router";
import {useAuth} from "../contexts/authContext.jsx";

export default function DashboardLayout() {
    const { user } = useAuth();

    return (
        <>
            <header>
                {JSON.stringify(user)}
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
