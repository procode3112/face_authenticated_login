// SignedInPage.js
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './nextpage.css';

function SignedInPage() {
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

  return (
    <div>
      <h2 className="signedin">Congratulations {username}</h2>
      <h3 className="signedin">Face Authentication Completed</h3>
    </div>
  );
}

export default SignedInPage;
