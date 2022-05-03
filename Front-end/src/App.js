import React,{useEffect} from 'react';
import Home from './components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AddProduct from './components/AddProducts';
import Product from './components/Products';
import Forgot from './components/Forgot';
import Register from './components/Register';
import { useSelector } from 'react-redux';

const App = () => {

  const loginname = useSelector((state) => state.loginName);

  useEffect(() => {
    if ((loginname) && (window.location.href !== 'http://localhost:3000/')) {
      window.location.replace('/')
    }
  }, [loginname]);

  return (
    <div>
      <Router>
          <Navbar />
                { loginname ?
                (<>
                <Route path="/" exact={true} component={Home} />
                <Route path="/addproducts" component={AddProduct} />
                <Route path="/products" component={Product} />
                </>)
                :   <Route path="/" exact={true} component={Login} />
                
                }
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={Forgot} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  )
}

export default App;