import React, { useState, useEffect } from 'react';
import { privApi } from '../utils/axiosInstances';

function Home ({token}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    privApi(token).get('/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(console.log);
  }, [token]);

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
