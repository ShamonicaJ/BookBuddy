import { useState } from 'react'
import { useLoginMutation } from './authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // eslint-disable-next-line no-unused-vars
    const [login, {data, error, isLoading}] = useLoginMutation();

    const attemptLogin = async (e) => {
        e.preventDefault();

        try {
            await login({ email, password }).unwrap()
            navigate('/')
        } catch (err) {
            // console.log(err)
        }
    }

    return <>
        <h2>Login</h2>
        <form onSubmit={attemptLogin}>
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
                Login
            </button>
            { error && <div>{error.data.message}</div> }
        </form>
    </>
}
