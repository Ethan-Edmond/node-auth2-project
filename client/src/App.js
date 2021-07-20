import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Splash from './components/Splash';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Splash}/>
      </Switch>
    </Router>
  );
}

export default App;
