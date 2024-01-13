import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Albums.css';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 24;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
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
  }, []);

  const pageNumbers = [];
  const totalPageCount = Math.ceil(albums.length / albumsPerPage);

  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  return (
    <div className="albums-container">
      <h2 id="albums-header">Albums</h2>
      <div className="albums-grid">
        {currentAlbums.map((album) => (
          <Link to={`/albums/${album.id}`} key={album.id} className="album-tile">
            <h3>{album.title}</h3>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Albums;
