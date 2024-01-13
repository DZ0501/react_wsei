import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Header.css';

const Header = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    if (username.trim() !== '') {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?name=' + username);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
  
        console.log('User data:', userData);  // Log user data for debugging
  
        if (userData.length > 0) {
          const { id, email } = userData[0]; // Extract email from user data
          setLoggedIn(true);
          onLogin({ id, username, email }); // Include email in the onLogin callback
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} className="App-logo" alt="logo" style={{ height: '40px', width: '60px' }} />
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">
          User List
        </Link>
        <Link to="/albums" className="nav-link">
          Albums
        </Link>
        <Link to="/photos" className="nav-link">
          Photos
        </Link>
        <Link to="/posts" className="nav-link">
          Posts
        </Link>
      </nav>
      <div className="login-bar">
        {loggedIn ? (
          <div className="welcome-container">
            <p className="welcome-message">{username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
