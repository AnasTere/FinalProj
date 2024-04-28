
import React, { useState } from 'react';
import { useRoutes, Link, Navigate } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetails from './components/PostDetails';
import Settings from './components/Settings';
import './App.css';

const App = () => {
  const [sortBy, setSortBy] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem('themeColor') || 'black'
  );

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle theme change
  const handleThemeChange = (color) => {
    setThemeColor(color);
  };

  let element = useRoutes([
    {
      path: '/',
      element: <ReadPosts sortBy={sortBy} searchQuery={searchQuery} />,
    },
    {
      path: '/edit/:id',
      element: <EditPost />,
    },
    {
      path: '/new',
      element: <CreatePost />,
    },
    {
      path: '/post/:id',
      element: <PostDetails />,
    },
    {
      path: '/settings',
      element: <Settings onThemeChange={handleThemeChange} />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <div className={`App ${themeColor}`}>
      <div className="header">
        <h1>Final</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" onChange={handleSortChange} value={sortBy}>
            <option value="created_at">Created Time</option>
            <option value="betCount">Upvotes Count</option>
          </select>
        </div>
        <Link to="/">
          <button className="headerBtn"> Home </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> Create Post </button>
        </Link>
        <Link to="/settings">
          <button className="headerBtn"> Settings </button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;










