import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const { loading: initialLoading, data: initialData } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('');

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre, 
  });

  const booksFiltered = data ? data.allBooks : [];

  if (!props.show) {
    return null;
  }

  const books = initialData ? initialData.allBooks : [];
  const genresDefault = books.map(book => book.genres);
  const genres = Array.from(new Set([].concat(...genresDefault)));

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}
      {loading || initialLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {booksFiltered.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {genres.map((genre) => (
              <button key={genre} onClick={() => setGenre(genre)}>
                {genre}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
