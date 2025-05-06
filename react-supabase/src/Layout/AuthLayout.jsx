import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg' // Adjust path based on your actual structure

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout ">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-brand">
            <img src={logo} alt="React-Supabase Logo" style={{ height: '40px' }} />
            <h1>React-Supabase</h1>
          </Link>
        </div>
        <div className="auth-content">
          {children}
        </div>
        <div className="auth-footer">
          <p>© {new Date().getFullYear()} React-Supabase. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;