import React,{useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import {BrowserRouter,Routes, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AddProduct from './components/AddProducts';
import Product from './components/Products';
import Forgot from './components/Forgot';
import Register from './components/Register';
import { useSelector } from 'react-redux';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import TrashProductListScreen from './screens/TrashProductListScreen';
import CategoryScreen from './screens/CategoryScreen';
import Footer from './components/Footer';
import SearchScreen from './screens/SearchScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {

  const loginname = useSelector((state) => state.loginName);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    if ((loginname) && (window.location.href !== 'http://localhost:3000/')) {
      window.location.replace('/')
    }
  }, [loginname]);

  return (
    <div>
      <BrowserRouter>
      <Navbar setSidebarIsOpen={(boolean) => setSidebarIsOpen(boolean)} />
                { loginname ?
                (<>
                  <aside className={sidebarIsOpen ? 'open' : ''}>
                    <ul className="categories">
                      <li>
                        <strong>Categories</strong>
                        <button
                          onClick={() => setSidebarIsOpen(false)}
                          className="close-sidebar"
                          type="button"
                        >
                          X
                        </button>
                      </li>
                      <li>
                        <Link
                          to={`/search/category/shirts`}
                          onClick={() => setSidebarIsOpen(false)}
                        >
                        Shirts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/search/category/pants`}
                          onClick={() => setSidebarIsOpen(false)}
                        >
                        Pants
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/search/category/shoes`}
                          onClick={() => setSidebarIsOpen(false)}
                        >
                        Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/search/category/others`}
                          onClick={() => setSidebarIsOpen(false)}
                        >
                        Others
                        </Link>
                      </li>
                    </ul>
                  </aside>
                  <Routes>
                <Route path="/" exact={true} element={<Home/>} />
                <Route path="/addproducts" element={<AddProduct/>} />
                <Route path="/products" element={<Product/>} />
                <Route path="/products/:id" element={<ProductScreen/>} />
                <Route path="/productlist" element={<ProductListScreen/>} />
                <Route path="/productlist/:id" element={<ProductEditScreen/>} />
                <Route path="/trashproductlist" element={<TrashProductListScreen/>} />
                <Route path="/search/category/:categoryName" element={<CategoryScreen/>} />
                <Route path="/search/name/:name" element={<SearchScreen/>} />
                </Routes>
                <Footer />
                </>)
                :   
                <Routes>
                <Route path="/" exact={true} element={<Login/>} />
                </Routes>
                }
                <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot" element={<Forgot/>} />
              <Route path="/register" element={<Register/>} />
                </Routes>
      </BrowserRouter>
      <ToastContainer position='bottom-center'/>
    </div>
  )
}

export default App;