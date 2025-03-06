import React from "react";


export const Private = ()=>{
    const token = sessionStorage.getItem('token');

    if(!token){
        console.log("You need to log in to see this page.")
    }
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        window.location.href = "/login";  
    };

    const reponse =fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/private")


    return(
        <h1>Welcome</h1>
    

    
    )
}