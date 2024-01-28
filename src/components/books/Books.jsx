import { useGetBooksQuery, useReserveMutation } from "./booksApi";
import BookCard from "./bookCard";
import './Books.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'; 

export default function Books() {
    const { data, error, isLoading } = useGetBooksQuery();
    const user = useSelector(state => state.auth.token);
    const [reserve] = useReserveMutation();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(''); 
    const [searchQuery, setSearchQuery] = useState(''); 

    if (isLoading) return <div>Loading...</div> 
    if (error && error.data) {
        return <div>{error.data.message}</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    }

    const checkout = async (bookId) => {
        try {
            await dispatch(reserve(bookId));
            setMessage('Book has been checked out. Book added to your account!');
        } catch (error) {
            console.error(error);
        }
    };


    const filteredBooks = data.books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="books-container">
            <input
                type="text"
                placeholder="Search books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            {message && <div>{message}</div>}
            {filteredBooks.map(book => (
                <div key={book.id} className="book-item">
                    <BookCard book={book} />
                </div>
            ))}
        </div>
    );
}

