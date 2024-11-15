"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";

interface IAuthContext{
    user: string | null;
    login: (id: string) => void;
    logout: () => void;
}

interface AuthProviderProps{
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: (id: string) => { },
    logout: () => {},
});

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        let userLocalStorage = localStorage.getItem("user");
        if (userLocalStorage) setUser(userLocalStorage);
    }, []);

    const login = (id: string) => {
        setUser(id);
        localStorage.setItem("user", id);
        router.push("/");
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    const value = { user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
 
export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    return authContext;
};

export default AuthProvider;