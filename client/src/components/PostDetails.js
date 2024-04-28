// PostDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './PostDetails.css'

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select()
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setPost(data);
        setCount(data.betCount); // Get the upvote count
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('Comments')
          .select()
          .eq('post_id', id);

        if (error) {
          throw error;
        }

        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from('Comments').insert([
        { post_id: id, text: newComment, author: 'Anonymous' },
      ]);

      if (error) {
        throw error;
      }

      setComments([...comments, data[0]]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const updateCount = async (event) => {
    event.preventDefault();

    await supabase.from('Posts').update({ betCount: count + 1 }).eq('id', id);

    setCount((count) => count + 1);
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await supabase.from('Posts').delete().eq('id', id);
        // Redirect to home page or other appropriate page after deletion
        // For example:
        // history.push('/');
      } catch (error) {
        console.error('Error deleting post:', error.message);
      }
    }
  };

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <button className="betButton" onClick={updateCount}>
      👍Upvotes: {count}
      </button>
      <br />
      <div className="post-actions">
        <br />
        <Link to={`/edit/${id}`} className="edit-link">Edit</Link>
        <button className="delete-button" onClick={handleDeletePost}>Delete</button>
      </div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <p>By: {comment.author}</p>
        </div>
      ))}
    </div>
  );
};

export default PostDetails;


