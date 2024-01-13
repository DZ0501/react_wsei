import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Albums from './Albums';
import Header from './Header';
import UserAlbums from './UserAlbums';
import UserList from './UserList';
import UserPosts from './UserPosts';
import UserTodos from './UserTodos';
import Photos from './Photos';
import Posts from './Posts';
import './App.css';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  return (
    <Router>
      <div className="App">
        <Header onLogin={handleLogin} />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:albumId" element={<Photos />} />
          <Route path="/users/:userId/albums" element={<UserAlbums />} />
          <Route path="/users/:userId/posts" element={<UserPosts />} />
          <Route path="/users/:userId/todos" element={<UserTodos />} />
          <Route path="/users" element={<UserList />} />
          <Route path='/photos' element={<Photos />} />
          <Route path="/posts" element={<Posts loggedInUser={loggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
