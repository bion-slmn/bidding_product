import { jwtDecode } from "jwt-decode";
import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./apiservice";
import { toast } from "react-toastify";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("bid_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(localStorage.getItem("bid") || "");
    const navigate = useNavigate();

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("bid_refresh");
        if (!refreshToken) {
            logOut();
            return;
        }

        try {
            const response = await fetch(`${API_URL}api/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            const res = await response.json();

            if (response.ok) {
                setToken(res.access);
                localStorage.setItem("bid", res.access);

                const decodedUser = jwtDecode(res.access);
                setUser(decodedUser);
                localStorage.setItem("bid_user", JSON.stringify(decodedUser));
            } else {
                logOut();
                throw new Error("Token refresh failed");
            }
        } catch (error) {
            console.error("Error refreshing token", error);
            logOut();
        }
    };

    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decodedToken.exp < currentTime;
    };

    const loginAction = async (data) => {
        const response = await fetch(`${API_URL}api/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        console.log(API_URL, res)
        if (response.ok && res.access) {
            const decodedUser = jwtDecode(res.access);
            setUser(decodedUser);
            setToken(res.access);
            localStorage.setItem("bid", res.access);
            localStorage.setItem("bid_refresh", res.refresh);
            localStorage.setItem("bid_user", JSON.stringify(decodedUser));
            toast.success("Login successful! Redirecting to dashboard...");

            navigate("/dashboard");
        } else {
            localStorage.setItem("bid", "");
            toast.error(res.message);
            throw new Error(res.message);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("bid");
        localStorage.removeItem("bid_refresh");
        localStorage.removeItem("bid_user");
        navigate("/login");
    };

    // Middleware to check token validity before accessing any authenticated routes
    const checkTokenAndRefresh = async () => {
        const token = localStorage.getItem("bid");
        console.log("Checking token and refreshing................", isTokenExpired(token));
        if (token && isTokenExpired(token)) {
            await refreshToken();
        }
        // navigate('/login')
    };

    return (
        <AuthContext.Provider
            value={{ token, user, loginAction, logOut, checkTokenAndRefresh }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
