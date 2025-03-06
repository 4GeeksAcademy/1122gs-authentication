import React from "react";
import { useNavigate } from "react-router-dom";


 export const PrivateComponent = ()=> {
    const navigate = useNavigate()
        const token = sessionStorage.getItem('token');
    
        if (!token) {
            console.log("You need to log in to see this page.")
        }
        const handleLogout = () => {
            sessionStorage.removeItem(token);
            window.location.href = "/login";
        };
    
        const reponse = fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/private", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        })
    

    return(
        <div>
            <h1> Welcome to out private page</h1>
            <br/>
            <button className="btn btn-primary " onClick={handleLogout}>Logout</button>
        </div>
    )
}
   