import React from 'react';


const Pagination = (props) => {
  let previousButton = null;
  if (props.lastBookDisplay === null || props.lastBookDisplay === 0 || !props.searchSuccess) {
    previousButton = <button onClick={() => props.getPreviousBooks()} disabled>Previous</button>
  } else {
    previousButton = <button onClick={() => props.getPreviousBooks()}>Previous</button>
  }

  let nextButton = null;
  if (props.currentBookDisplay >= props.maxBooks || !props.searchSuccess) {
    nextButton = <button onClick={() => props.getBooks()} disabled>Next</button>
  } else {
    nextButton = <button onClick={() => props.getBooks()}>Next</button>
  }
  
  return (
    <div className='pagination'>
      {previousButton}
      {nextButton}
    </div>
  )
}

export default Pagination;
