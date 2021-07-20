import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = (token) => axios.create({
  baseURL: 'http://localhost:5000/api/users',
  headers: {
    Authorization: token
  }
});

function Home ({token}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api(token).get('')
      .then(res => {
        setUsers(res.data);
      })
      .catch(console.log);
  }, []);

  return (
    <ul className='users'>
      { users.map(user => {
        return (
          <li key={user.user_id}>
            <h5>
              {user.username}
            </h5>
            <p>
              {user.role_name}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default Home;
