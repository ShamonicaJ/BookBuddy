/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useRegisterMutation } from './AuthSlice'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register, {data, error, isLoading}] = useRegisterMutation();

    const attemptRegister = async (e) => {
        e.preventDefault();

        try {
            await register({ email, password }).unwrap();
            navigate('/');
        } catch (err) {
            // console.log(err);
        }
    }

    return <>
        <h2>Register</h2>
        <form onSubmit={attemptRegister}>
            <label>
                Email
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </label>
            <label>
                Password
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </label>
            <button>
                Register
            </button>
            { error && <div>{error.data.message}</div> }
        </form>
    </>
}
// 