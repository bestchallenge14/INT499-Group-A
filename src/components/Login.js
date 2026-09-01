/*  
    StreamList App
    Jose Hernandez
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/


import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    setIsAuthenticated(true);
    localStorage.setItem('eztech_auth', 'true');
    navigate('/');
  };

  const handleError = () => {
    console.error('Login Failed');
    alert('Google authentication failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>EZTechMovie StreamList</h2>
        <p>Please log in with Google to access the store, services, and checkout.</p>
        <div className="google-btn-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="filled_blue"
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;