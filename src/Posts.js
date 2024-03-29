import React, { useState, useEffect } from 'react';
import './Posts.css';
import PostComments from './PostComments';
import PostAuthorInfo from './PostAuthorInfo';

const Posts = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
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
  }, []);

  const handleDelete = (postId, postUserId) => {
    if (loggedInUser && loggedInUser.id === postUserId) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } else {
      console.log("You can only delete your own posts.");
    }
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: newPostTitle,
          body: newPostBody,
          userId: loggedInUser.id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create a new post');
      }


      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      console.log('New Post ID:', newPost.id);

      setNewPostTitle('');
      setNewPostBody('');
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error creating a new post:', error);
    }
  };

  const handleAuthorInfo = (authorId) => {
    setSelectedAuthorId(authorId);
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>{loggedInUser && (
          <button onClick={() => setShowNewPostForm(true)}>Add Post</button>
        )}</h2>

      </div>
      {showNewPostForm && (
        <form className="new-post-form" onSubmit={handleNewPostSubmit}>
          <button className="close-button" onClick={() => setShowNewPostForm(false)}>
            X
          </button>
          <h3>Create a New Post</h3>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              required
            />
          </div>
          <button type="submit">Post</button>
        </form>
      )}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button className="author-button" onClick={() => handleAuthorInfo(post.userId)}>
              Author: {post.userId}
            </button>
            <button onClick={() => setSelectedPostId(post.id)}>Comments</button>
            {loggedInUser && (
              <button onClick={() => handleDelete(post.id, post.userId)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      console.log("loggedInUser:", loggedInUser);

      {selectedPostId && <PostComments postId={selectedPostId} onClose={() => setSelectedPostId(null)} loggedInUser={loggedInUser} />}
      {selectedAuthorId && <PostAuthorInfo userId={selectedAuthorId} onClose={() => setSelectedAuthorId(null)} />}
    </div>
  );
};

export default Posts;
