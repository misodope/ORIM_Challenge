import React from 'react';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let previousButton;
    if (this.props.lastBookDisplay === null || this.props.lastBookDisplay === 0 || !this.props.searchSuccess) {
      previousButton = <button onClick={() => this.props.getPreviousBooks()} disabled>Previous</button>
    } else {
      previousButton = <button onClick={() => this.props.getPreviousBooks()}>Previous</button>
    }

    let nextButton;
    if (this.props.currentBookDisplay >= this.props.maxBooks || !this.props.searchSuccess) {
      nextButton = <button onClick={() => this.props.getBooks()} disabled>Next</button>
    } else {
      nextButton = <button onClick={() => this.props.getBooks()}>Next</button>
    }
    return (
      <div className='pagination'>
        {previousButton}
        {nextButton}
      </div>
    )
  }
}

export default Pagination;
