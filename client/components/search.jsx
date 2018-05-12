import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTitle: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchTitle: e.target.value
    })
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.searchBooks(this.state.searchTitle);
    }
  }

  render() {
    return (
      <div className='search'>
        <input type='text' placeholder='Search Titles...' onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
        <button type='button' onClick={() => this.props.searchBooks(this.state.searchTitle)}><i className="fas fa-search" /></button>
      </div>
    )
  }
}

export default Search;
