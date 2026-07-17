import { createContext, useContext, useEffect, useState } from "react";
import { httpInterceptor } from "../component/lib/httpInterceptor";
import { Navigate, Outlet } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(undefined);

    const userFetch = async () => {
        try {
            const { data } = await httpInterceptor.get("/auth/session");
            setUserInfo(data); 
        } catch (err) {
            setUserInfo(null); 
        }
    };

    useEffect(() => {
        userFetch();
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, userFetch, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = () => {
    const { userInfo, setUserInfo } = useAuth()

    if (userInfo === undefined) return <div>Loading...</div>;
    if (userInfo === null) return <Navigate to="/login" />;

    return <Outlet />;
};

export const RedirectRoute = () => {
    const { userInfo, setUserInfo } = useAuth()


    if (userInfo === undefined) return null;

    if (userInfo === null) return <Outlet />;

    return <Navigate to="/dashboard" />;
};
