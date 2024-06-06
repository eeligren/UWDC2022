import {Outlet, useNavigate} from "react-router";
import {useAuth} from "../contexts/authContext.jsx";

export default function DashboardLayout() {
    const { user, logout } = useAuth();

    return (
        <>
            <header className="p-4 bg-slate-700 flex items-center justify-between">
                <div>

                </div>

                <div className="flex items-center gap-4">
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm">competitor</p>
                    </div>
                    <button className="py-2 px-4 border rounded-md uppercase font-semibold text-sm" onClick={logout}>Sign Out</button>
                </div>
            </header>
            <main className={'p-12'}>
                <Outlet />
            </main>
        </>
    );
}
