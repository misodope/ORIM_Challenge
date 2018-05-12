import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    }

    this.showBookDetails = this.showBookDetails.bind(this);
  }

  showBookDetails() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  }

  render() {
    return (
      !this.state.showDetails
      ?
      <div className='book' onClick={() => this.showBookDetails()}>
        {
          this.props.image !== null ? <img src={this.props.image} /> : <h2>No Image Available</h2>
        }
        <h4>{this.props.title}</h4>
        <h5>By {this.props.author}</h5>
      </div>
      :
      <div className='bookDetails' onClick={() => this.showBookDetails()}>
        <h3>Genre: {this.props.genre}</h3>
        <h3>Publisher: {this.props.publisher}</h3>
        <h3>ISBN: {this.props.isbn}</h3>
        <h3>Price: {this.props.price}</h3>
        <h3>Amazon Rank: {this.props.rank}</h3>
      </div>
    )
  }
}

export default Book;
