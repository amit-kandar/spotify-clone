import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";

function SginIn() {
    const host = "http://localhost:5001"

    const [credential, setCredential] = useState({ email: "" })
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email })
        });

        const user = await response.json();
        if (user.success) {
            localStorage.setItem('authtoken', user.authtoken)
            navigate('/')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} name="email" id="email" aria-describedby="emailHelp" onChange={ onChange } />
                </div>
                <button type="submit" className="btn btn-primary" >Log in</button>
            </form>
        </div>
    )
}

export default SginIn