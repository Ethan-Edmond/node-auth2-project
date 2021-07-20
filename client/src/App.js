import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Splash from './components/Splash';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Switch>
        <Route path='/home'>
          <Home token={token}/>
        </Route>
        <Route path='/login'>
          <Login setToken={setToken}/>
        </Route>
        <Route path='/' component={Splash}/>
      </Switch>
    </Router>
  );
}

export default App;
