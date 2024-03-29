import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user_token', token);
      console.log(token);
    }
  }, [result.data, setToken]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setPage("authors");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
        <div>
        <form onSubmit={submit}>
          <div>
            username{' '}
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
        </div>
    </div>
  );
};

export default LoginForm;
