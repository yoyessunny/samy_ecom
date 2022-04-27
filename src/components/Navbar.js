import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <img src='logo192.png' alt='' width='50px' />
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
              <li><Link to="/" className="nav-link px-2 text-white">Features</Link></li>
              <li><Link to="/" className="nav-link px-2 text-white">Pricing</Link></li>
              <li><Link to="/" className="nav-link px-2 text-white">FAQs</Link></li>
              <li><Link to="/" className="nav-link px-2 text-white">About</Link></li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
            </form>

            <div className="text-end">
              <Link to="/login" type="button" className="btn btn-outline-light me-2">Login</Link>
              <button type="button" className="btn btn-warning">Sign-up</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar