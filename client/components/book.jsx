import React from 'react';

const Book = (props) => (
  <div className='book'>
    {
      props.image !== null ? <img src={props.image} /> : <h2>No Image Available</h2>
    }
    <h4>{props.title}</h4>
    <h5>By {props.author}</h5>
  </div>
)

export default Book;
