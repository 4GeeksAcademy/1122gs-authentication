import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            console.log("You need to log in to see this page.");
            navigate("/login");
            return;
        }
        console.log(token,"You successfully logged in.");
        const fetchPrivate = async () => {
            try {
                const response = await fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/private", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`  
                    }
                });
                console.log(response, "This is the response")
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching private page:", error);
                setError(error.message);
            }
        };
        
        fetchPrivate();
    }, []);  
    
    const handleLogout = () => {
        sessionStorage.removeItem(token);
        navigate("/login");
    };

    return (
        <div>
            <h1>Welcome</h1>
            {token ? (
                <div className="private">
                    <h3>You are now logged in</h3>
                    {error ? <p className="error">{error}</p> : <p>Welcome, {userData?.logged_in_as || "User"}</p>}
                    <button className="btn btn-primary logout" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="notLoggedIn">
                    <h3 className="login"> Please log in</h3>
                    <button className="btn btn-danger navLog" onClick={() => navigate("/login")}> Login</button>
                </div>
            )}
        </div>
    );
};
