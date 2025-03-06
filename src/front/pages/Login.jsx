import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "./SIgnup";


export const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleclick = async (e) => {
        e.preventDefault()
        const payload = { "email": "email", "password": "password" }

       const response = await fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
        )
        try{
            if(!response.ok){
                console.log("Login failed")
            }
           data = response.json()

           if(data.token){
            sessionStorage.setItem("token", data.token);
            window.location.href = "/private";
           }
        }
        catch{
            (console.error("Error fatching data"))
        }







            // .then((resp) => {
            //     if (!resp.ok) {
            //         console.log("Error fetching token ")
            //     }
            //     return resp.json()

            // })
            // .then((data) => {
            //     console.log("Here is your data", data);
            //     if (data.token) {  
            //         sessionStorage.setItem("token", data.token);
            //         window.location.href = "/private";  
            //     } else {
            //         console.log("No token received");
            //     }
            // })



            // catch(error => console.log("Error fetching token", error))

    }

    return (
        <div className="container">
            <h1> LogIn</h1>
            <form onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="InputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )

}