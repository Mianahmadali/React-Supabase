// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuth, user, handleLogout } = useAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">React-Supabase</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link active">Home</Link>
              </li>
              {isAuth && (
                <li className="nav-item">
                  <Link to='/dashboard' className="nav-link">Dashboard</Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              {isAuth ? (
                <>
                  <span className="text-light me-3">
                    Welcome, {user?.email || 'User'}
                  </span>
                  <button 
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to='/auth/register' className="btn btn-success me-2">Register</Link>
                  <Link to='/auth/login' className="btn btn-light">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;