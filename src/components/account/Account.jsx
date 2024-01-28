
import { useMeQuery, useReservationsQuery } from "./AuthSlice"

import ReservedBookCard from "./ReservedBookCard";
import { useDispatch } from 'react-redux';

export default function Account() {
    const me = useMeQuery();
    const reservations = useReservationsQuery();
    const dispatch = useDispatch();
    const removeBook = (id) => { // Function to remove a book
        dispatch({ type: 'auth/removeBook', payload: id });
    }
        
    if (me.isLoading || reservations.isLoading) return <div>Loading...</div> 
    if (me.error) return <div>{me.error.data.message}</div>
    if (reservations.error) return <div>{reservations.error.data.message}</div>

    return <>
        <h2>Hello {me.data.email}</h2>
        <h3>Your Reservations:</h3>
        {reservations.data.reservation.length > 0 ? 
            reservations.data.reservation.map(book => (
                <div key={book.id}>
                    <ReservedBookCard book={book} />
                    <button onClick={() => removeBook(book.id)}>Remove</button> {/* Button to remove a book */}
                </div>
            )) :
            <p>You have 0 books checked out.</p>
        }
    </>
}
