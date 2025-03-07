import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const handleclick = async (e) => {
        e.preventDefault()
        const payload = { "email": email, "password": password}
        

        try {
            const response = await fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
            )

            if (!response.ok) {

                throw new Error("Login failed");
            }
            const data =  await response.json();

            if (data) {
                sessionStorage.setItem("token", data);
                navigate("/private");
            }
        }
        catch (error) {
            console.error("Error fatching data")
        }

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