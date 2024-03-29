import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';
import { useApolloClient } from '@apollo/client' 


const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient()


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {!token && <button onClick={() => setPage('login')}>Login</button> }
        {token && <button onClick={() => setPage('add')}>Add Book</button>}
        {token && <button onClick={() => setPage('recommend')}>Recommend</button>}
        {token && <button onClick={logout}>logout</button> }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Recommend show={page === 'recommend'} token = {token} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage = {setPage} />

      {token && <NewBook show={page === 'add'} />}
    </div>
  );
};

export default App;
