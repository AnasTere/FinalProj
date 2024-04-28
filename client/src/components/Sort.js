

import React, { useState, useEffect } from 'react';
import Card from './Card';
import { supabase } from '../client';

const Sort = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at'); // Default sort by created_at

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let { data, error } = await supabase.from('Posts').select().order(sortBy, { ascending: false });
        
        if (error) {
          throw error;
        }

        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [sortBy]);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortBy} onChange={handleSortByChange}>
        <option value="created_at">Created Time</option>
        <option value="betCount">Upvotes Count</option>
      </select>
      {posts.map(post => (
        <Card
          key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          description={post.description}
        />
      ))}
    </div>
  );
};

export default Sort;
