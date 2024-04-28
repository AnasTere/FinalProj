import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = ({ sortBy, searchQuery }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let { data, error } = await supabase
          .from('Posts')
          .select()
          .order(sortBy, { ascending: sortBy === 'created_at' });

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

  // Filter posts by title based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ReadPosts">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            description={post.description}
          />
        ))
      ) : (
        <h2>No Posts Found 😞</h2>
      )}
    </div>
  );
};

export default ReadPosts;

