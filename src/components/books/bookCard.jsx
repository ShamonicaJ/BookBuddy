import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const BookCardContainer = styled.div`
  display: flex;
  gap: 1ch;
  width: 100%;
  height: auto;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;

  .book-image {
    flex: 1;
    min-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 200px;
      max-height: 100%;
      object-fit: cover;
    }
  }

  .book-info {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
      margin: 0;
      font-family: 'Roboto', sans-serif;
      color: #202124;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0;
      font-family: 'Roboto', sans-serif;
      color: #606368;
    }

    p {
      margin: 0.5rem 0;
      font-family: 'Roboto', sans-serif;
      color: #606368;
    }

    a {
      display: block;
      text-align: right;
      text-decoration: none;
      color: #007bff;
      font-family: 'Roboto', sans-serif;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default function BookCard({ book }) {
  const shortDesc = book.description.slice(0, 175) + '...';

  return (
    <BookCardContainer>
      <div className="book-image">
        <img src={book.coverimage} alt={book.title} />
      </div>
      <section className="book-info">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{shortDesc}</p>
        <Link to={`/books/${book.id}`}>More Info</Link>
      </section>
    </BookCardContainer>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    description: PropTypes.string.isRequired,
    coverimage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

