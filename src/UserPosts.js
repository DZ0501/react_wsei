import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserPosts.css';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="user-posts-container">
      <h2 id="user-posts-header">Posts</h2>
      <ul className="user-posts-list">
        {posts.map((post) => (
          <li key={post.id} className="user-posts-item">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
