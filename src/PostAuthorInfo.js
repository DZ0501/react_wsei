// PostsAuthorInfo.js
import React, { useState, useEffect } from 'react';
import './PostAuthorInfo.css';

const PostsAuthorInfo = ({ userId, onClose }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div className="author-info-modal" onClick={onClose}>
      <div className="author-info" onClick={(e) => e.stopPropagation()}>
        {userInfo ? (
          <>
            <h2>{userInfo.name}</h2>
            <p>Email: {userInfo.email}</p>
            <p>Phone: {userInfo.phone}</p>
            <p>Website: {userInfo.website}</p>
            <p>Company: {userInfo.company.name}</p>
            <p>Address: {userInfo.address.street}, {userInfo.address.suite}, {userInfo.address.city}</p>
            {/* Add more user info fields as needed */}
          </>
        ) : (
          <p>Loading user information...</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostsAuthorInfo;
