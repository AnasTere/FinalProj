import React from 'react'
import { useState,useEffect } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'


const Card = (props) =>  {

  const [count, setCount] = useState(0)
  const [timeCreated, setTimeCreated] = useState(null);


  const updateCount = async (event) => {
    event.preventDefault();
  
    await supabase
      .from('Posts')
      .update({ betCount: count + 1})
      .eq('id', props.id)
  
    setCount((count) => count + 1);
  }



  useEffect(() => {
    getTimeCreated();
    const getCount = async (event) => {
      const {data} = await supabase
      .from('Posts')
      .select()
      .eq('id',props.id);

      setCount(data[0].betCount)
    }
    getCount()
  },[props])

  const getTimeCreated = async () => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .select('created_at')
        .eq('id', props.id)
        .single();

      if (error) {
        throw error;
      }

      // Set time created state
      setTimeCreated(data.created_at);
    } catch (error) {
      console.error('Error fetching time created:', error.message);
      // Set time created to null in case of error
      setTimeCreated(null);
    }
  };



  return (
      <div className="Card">
        <Link to={'/post/' + props.id} className="post-link"> {/* Added Link here */}
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"by " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Upvotes: {count}</button>
          {timeCreated && (<h6 className="timeCreated">Time Created: {new Date(timeCreated).toLocaleString()}</h6>)}
          </Link>
      </div>
  );
};

export default Card;