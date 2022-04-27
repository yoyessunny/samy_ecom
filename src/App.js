import React from 'react';
import Home from './components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Router>
          <Navbar />
          <Route path="/" exact={true} component={Home} />
          <Route path="/login" component={Login} />
      </Router>
    </div>
  )
}

export default App