import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function LoginPage() {
  // Define state variables for username, password, and login status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  const messageDuration = 1000;
  

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = 'Facial Authentication';
  }, []);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to the Flask backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication and facial recognition succeeded
        const data = await response.json();
        setLoginStatus(`Logged In as ${data.user}`);

        setTimeout(() => {
          setLoginStatus('');
        }, messageDuration);
        
        navigate('/src/NextPage.js', {state: username});
        // You can redirect to the signed-in page here if needed
      } else {
        // Authentication or facial recognition failed
        setLoginStatus('Login failed');
        setTimeout(() => {
          setLoginStatus('');
        }, messageDuration);

        navigate('/src/Unauthenticated.js', {state: username});
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-background'>
      <h1 className="animate-charcter">FACEID AUTHENTICATION</h1>
      <div className="login-container">
        <h2 className="login-subheader">ADD CREDENTIALS</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              className='login-input'
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              className='login-input'
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='login-button'>Login</button>
        </form>
        <p>{loginStatus}</p>
      </div>
    </div>
  );
}

export default LoginPage;
