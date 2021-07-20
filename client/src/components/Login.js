import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth'
});

function Login ({setToken}) {
  const {push} = useHistory();
  const [formVal, setFormVal] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState('');

  const onChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    api.post('/login', formVal)
      .then(({data: {token}}) => {
        setToken(token);
        push('/home');
      })
      .catch(err => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='username'
        name='username'
        onChange={onChange}
        value={formVal.username}
        placeholder='Username'
      />
      <input
        type='password'
        name='password'
        onChange={onChange}
        value={formVal.password}
        placeholder='Password'
      />
      <button>Login</button>
      <h3>{errors}</h3>
    </form>
  );
}

export default Login;
