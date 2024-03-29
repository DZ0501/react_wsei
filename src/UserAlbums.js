import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserAlbums.css';

const UserAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [userId]);

  return (
    <div className="user-albums-container">
      <h2 id="user-albums-header">Albums</h2>
      <div className="user-albums-grid">
        {albums.map((album) => (
          <Link to={`/albums/${album.id}`} key={album.id} className="user-album-tile">
            <h3>{album.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserAlbums;
