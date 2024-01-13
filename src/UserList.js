import React, { useState, useEffect } from 'react';
import UserAlbums from './UserAlbums';
import UserTodos from './UserTodos';
import UserPosts from './UserPosts'; 
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleShowEmail = (email) => {
    setSelectedUser(email);
  };

  const handleCloseEmail = () => {
    setSelectedUser(null);
    setShowAlbums(false);
    setShowTodos(false);
    setShowPosts(false);
  };

  const handleShowAlbums = (userId) => {
    setSelectedUser(null);
    setShowAlbums(true);
    setShowTodos(false);
    setShowPosts(false);
    navigate(`/users/${userId}/albums`);
  };

  const handleShowTodos = (userId) => {
    setSelectedUser(null);
    setShowAlbums(false);
    setShowTodos(true);
    setShowPosts(false);
    navigate(`/users/${userId}/todos`);
  };

  const handleShowPosts = (userId) => {
    setSelectedUser(null);
    setShowAlbums(false);
    setShowTodos(false);
    setShowPosts(true);
    navigate(`/users/${userId}/posts`);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-item">
            <div>
              <strong>{user.name}</strong>
            </div>
            <div className="user-actions">
              <button onClick={() => handleShowAlbums(user.id)}>Albums</button>
              <button onClick={() => handleShowTodos(user.id)}>Todos</button>
              <button onClick={() => handleShowPosts(user.id)}>Posts</button>
              <button onClick={() => handleShowEmail(user.email)}>Email</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>


      {selectedUser && (
        <div className={`modal ${selectedUser && 'active'}`} onClick={handleCloseEmail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{selectedUser}</p>
            <button onClick={handleCloseEmail}>Close</button>
          </div>
        </div>
      )}
      {showAlbums && <UserAlbums />}
      {showTodos && <UserTodos />}
      {showPosts && <UserPosts />}
    </div>
  );
};

export default UserList;
