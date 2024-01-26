import { Routes, Route, Navigate } from 'react-router-dom';
import Navigations from './components/Navigations'
import Books from './components/books/Books'
import BookDetails from './components/books/BookDetails'
import Register from './components/account/Register'
import Account from './components/account/Account'
import Login from './components/account/Login'
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector(state => state.auth.token)

  return (
    <>
      <Navigations />
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        { token ? (
          <>
            <Route path="/account" element={<Account />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App

// 