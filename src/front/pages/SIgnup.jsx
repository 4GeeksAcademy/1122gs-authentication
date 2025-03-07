import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();   

        const payload = { 'email':email, 'password':password };

        try {
            const response = await fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Signup failed");
            }

            const data = await response.json();  

            console.log("User added successfully:", data);
            navigate('/login');  

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container myForm">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>  
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="InputEmail1" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password1" className="form-label">Create Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="Password1" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>  
            </form>
        </div>
    );
};
