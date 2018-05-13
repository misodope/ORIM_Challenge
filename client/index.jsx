import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Book from './components/book.jsx';
import Pagination from './components/pagination.jsx';
import Search from './components/search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBooks: [],
      currentBookDisplay: 0,
      lastBookDisplay: null,
      maxBooks: null,
      searchSuccess: true,
    }

    this.getBooks = this.getBooks.bind(this);
    this.getPreviousBooks = this.getPreviousBooks.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.resetBooks = this.resetBooks.bind(this);
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    axios.get('/next/books', {
      params: {
        currentBookDisplay: this.state.currentBookDisplay,
        lastBookDisplay: this.state.lastBookDisplay,
      }
    })
      .then((results) => {
        this.setState({
          currentBooks: results.data.showBooks,
          currentBookDisplay: results.data.currentBooks,
          lastBookDisplay: results.data.lastBooks,
          maxBooks: results.data.maxBooks
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPreviousBooks() {
    axios.get('/previous/books', {
      params: {
        currentBookDisplay: this.state.currentBookDisplay,
        lastBookDisplay: this.state.lastBookDisplay,
      }
    })
      .then((results) => {
        this.setState({
          currentBooks: results.data.showBooks,
          currentBookDisplay: results.data.currentBooks,
          lastBookDisplay: results.data.lastBooks
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchBooks(search) {
    this.setState({
      currentBookDisplay: 0,
      lastBookDisplay: null,
    }, () => {
      axios.get('/search/books', {
        params: {
          search,
          currentBookDisplay: this.state.currentBookDisplay,
          lastBookDisplay: this.state.lastBookDisplay
        }
      })
        .then((results) => {
          this.setState({
            currentBooks: results.data.showBooks,
            currentBookDisplay: results.data.currentBooks,
            lastBookDisplay: results.data.lastBooks,
            maxBooks: results.data.maxBooks,
            searchSuccess: true
          })
        })
        .catch((error) => {
          this.setState({
            searchSuccess: false
          });
        });
    });
  }

  resetBooks() {
    axios.get('/reset')
      .then(() => {
        this.setState({
          currentBookDisplay: 0,
          currentBooks: [],
          lastBookDisplay: null,
          maxBooks: null,
          searchSuccess: true,
        }, () => this.getBooks())
      })
  }

  render() {
    return (
      <div className='grid-wrapper'>
        <div className='grid-title'>
          <h1 onClick={this.resetBooks}>OCIM Book Collection</h1>
          <Search
            searchBooks={this.searchBooks}
          />
        </div>
        {
          this.state.searchSuccess
          ?
          this.state.currentBooks.map((book, i) => (
            <Book
              key={i}
              title={book.title}
              //Check if image link has http(s):// prefix, if not add prefix.
              image={
                (book.image !== undefined && book.image.includes('http')) ? book.image : book.image === undefined ? null : `http://${book.image}`
              }
              price={book.price}
              publisher={book.publisher}
              isbn={book.primary_isbn}
              author={book.authors[0].display_name}
              rank={book.amazon_rank}
              genre={book.primary_bisacs}
            />
          ))
          :
          <h1 className='searchFailHeader'>Our Apologies, we can't seem to find what you're looking for. Please try again.</h1>
        }
        <Pagination
          getBooks={this.getBooks}
          getPreviousBooks={this.getPreviousBooks}
          lastBookDisplay={this.state.lastBookDisplay}
          currentBookDisplay={this.state.currentBookDisplay}
          maxBooks={this.state.maxBooks}
          searchSuccess={this.state.searchSuccess}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
