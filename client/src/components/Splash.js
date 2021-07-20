import React from 'react';
import { Link } from 'react-router-dom';

function Splash () {
  return (
    <div className='splash'>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </div>
  );
}

export default Splash;
