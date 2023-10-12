import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Unauthorized() {
  const location = useLocation();
  const username = location.state.username;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the login page
      navigate('/'); // Replace '/login' with the actual path to your login page
    }, 5000);

    return () => clearTimeout(timer);
}, [navigate]);
console.log('Unauthorized component rendered.');
  return (
    <div className="signed-in-background">
      <h1>Unauthorized user {username} detected.</h1>
    </div>
  );
}

export default Unauthorized;
