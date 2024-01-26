/* eslint-disable react/prop-types */
import { useReturnMutation } from "../books/booksApi";

export default function ReservedBookCard({ book }) {
    const [returnBook] = useReturnMutation();
    const tryReturn = (e) => {
        e.preventDefault()
        returnBook(book.id)
    }
    
    return <h3>
        {book.title}
        <form onSubmit={tryReturn}>
            <button>Return</button>
        </form>
    </h3>
}

// 