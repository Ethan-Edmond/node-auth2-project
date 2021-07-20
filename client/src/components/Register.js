import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { pubApi} from '../utils/axiosInstances';

function Register () {
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
    pubApi.post('/register', formVal)
      .then(res => {
        push('/login');
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
      <button>Register</button>
      <h3>{errors}</h3>
    </form>
  );
}

export default Register;
