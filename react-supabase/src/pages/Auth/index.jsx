import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './Forgot-password';

const Auth = () => {
  return (
    <Routes>
  <Route path='/register' element={<Register/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/forgot-password' element={<ForgotPassword/>} />
</Routes>


  );
}

export default Auth;