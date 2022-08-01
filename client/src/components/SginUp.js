import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const host = "http://localhost:5001"

    const [credential, setCredential] = useState({ name: "", email: "" })
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email })
        });

        const user = await response.json();
        if(user.success) {
            navigate('/signin')
        } else {
            navigate('/signup')
        }
        
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credential.name} name="name" id="name" aria-describedby="emailHelp" onChange={ onChange } required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} name="email" id="email" aria-describedby="emailHelp" onChange={ onChange } required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup