import React, { useEffect } from 'react';
import { ME, ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Recommend = ({ show, token }) => {
  const { loading, error, data, refetch } = useQuery(ME, {
    skip: !token,
  });

  const user = data ? data.me : null;
  const genre = user?.favoriteGenre;

  const { loading: loading2, data: data2 } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre, 
  });

  const booksFiltered = data2 ? data2.allBooks : [];
  
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!show || !user) {
    return null;
  }

  return (
    <>
      <h2>Recommendations</h2>
      {genre && <p>Books in your favorite genre <strong>{genre}</strong></p>}
      {loading2 ? (
        <p>Loading recommended books...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {booksFiltered.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Recommend;
