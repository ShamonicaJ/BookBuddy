import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useReserveMutation } from './booksApi';
import { useSelector, useDispatch } from 'react-redux'; 
import '../../index.css';

export default function BookDetails() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const { id } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id);
  const [reserve] = useReserveMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.data.message}</div>;

  const tryReserve = async (e) => {
    e.preventDefault();
    if (!token) {
      
      navigate('/login');
      return;
    }

    await reserve(id);
    
    dispatch({ type: 'auth/addBook', payload: data.book });
    navigate('/account');
  };

  return (
    <main>
      <h1>{data.book.title}</h1>
      <h2>{data.book.author}</h2>
      <div className="book-card">
        <div className="book-image">
          <img src={data.book.coverimage} alt={data.book.title} />
        </div>
        <section className="book-info">
          <p>{data.book.description}</p>
          {token && (
            <form onSubmit={tryReserve}>
              {data.book.available ? <button>Checkout</button> : "Not available"}
            </form>
          )}
          {!token && <p>Please log in to check out the book.</p>}
        </section>
      </div>
    </main>
  );
}
// 