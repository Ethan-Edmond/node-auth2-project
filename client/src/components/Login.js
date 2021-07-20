import React, { useState } from 'react';

function Login () {
  const [formVal, setFormVal] = useState({
    username: '',
    password: ''
  });

  const onChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formVal);
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
    </form>
  );
}

export default Login;
