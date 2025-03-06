import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = (e)=>{
        e.preventDefault()
       const payload ={"email":e.target.email.value, "password":e.target.password.value}

        fetch("https://fluffy-sniffle-q7ppr6jr9j9x34q4j-3001.app.github.dev/signup",{
            method:"POST",
            headers:{ "Content-Type":"application/json"},
            body:JSON.stringify(payload)
        })
        .then((resp) => {
            if(!resp.ok){
                throw new Error("Signup failed");
            }
            return resp.json()
        })
        .then((data)=> {
            console.log("You are signed in", data);
            window.location.href = "/login";
             
        })
        
        
        .catch((error)=> console.log("Error fetching data",error ))
       
    }

    

    return (
        <div className="container myForm">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="fullName" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password1" className="form-label" > Create Password</label>
                    <input type="password" className="form-control" id="Password1" required value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">I Agree to the terms and conditions</label>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        </div>
    )

}