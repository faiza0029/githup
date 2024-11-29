import React, { useState } from 'react';
import './App.css'; 

const GitHubUserSearch = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setError('');
      })
      .catch(err => {
        setError(err.message);
        setUserData(null);
      });
  };

  return (
    <div className="github-search-container">
      <h1 className="title">GitHub User Search</h1>
      <div className="search-bar">
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter GitHub username" 
          className="input-field"
        />
        <button 
          onClick={handleSearch} 
          className="search-button"
        >
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {userData && (
        <div className="user-profile">
          <img src={userData.avatar_url} alt={userData.login} className="profile-image" />
          <h2>{userData.login}</h2>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
          <p><strong>Repositories:</strong> {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default GitHubUserSearch;

