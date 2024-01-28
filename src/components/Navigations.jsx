import { Link } from 'react-router-dom'
import bookLogo from '../assets/books.png'
import { useSelector, useDispatch } from 'react-redux'

export default function Navigations() {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({ type: 'auth/logout' });
    }

    const notLoggedIn = (
        <ul style={{ display: "flex", listStyleType: "none" }}>
            <li style={{ marginRight: 8 }}>
                <Link to="/login" style={{ color: 'white' }}>Login</Link>
            </li>
            <li>
                <Link to="/register" style={{ color: 'white' }}>Register</Link>
            </li>
        </ul>
    )

    const loggedIn = (
        <ul style={{ display: "flex", listStyleType: "none" }}>
            <li style={{ marginRight: 8 }}>
                <Link to="/account" style={{ color: 'white' }}>Account</Link>
            </li>
            <li onClick={logout} style={{ cursor: 'pointer', color: 'white' }}>
                Logout
            </li>
        </ul>
    )

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "black",
                marginBottom: "10px",
            }}
        >
            <h1>
                <Link to='/' style={{ color: 'white' }}>
                    <img id="logo-image" src={bookLogo} alt="Library App logo" />
                    Library App
                </Link>
            </h1>
            <ul style={{ display: "flex", listStyleType: "none" }}>
                <li style={{ marginRight: 8 }}>
                    <Link to="/books" style={{ color: 'white' }}>Books</Link>
                </li>
                {token ? loggedIn : notLoggedIn}
            </ul>
        </div>
    )
}
