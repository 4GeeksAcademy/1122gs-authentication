import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "./SIgnup";


export const LogIn = () => {
    const payload = {"email":"email", "password":"password"}
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleclick= () => {
        fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/token", {
            method: "POST",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({payload})
         }
        ) 
        .then((resp) => {
            if(!resp.ok){
                console.log("Error fetching token ")
            }
            return resp.json()

        })
        .then((data) => {sessionStorage(data.token), console.log("Here is your data", data)
        window.location.href = "/login";}
    
    )
        
        .catch(error => console.log("Error fetching token" , error))
        
    }

    return (
        <div className="container">
            <h1> LogIn</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="InputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleclick}>Login</button>
            </form>
        </div>
    )

}