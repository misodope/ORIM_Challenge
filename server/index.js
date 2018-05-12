const express = require('express');
const parser = require('body-parser');
const path = require('path');
const books = require('../data/books-test-collection.json');

const app = express();
const port = 3000;

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

let maxBooks = books.length;
let searchedBooks = []

/* ************************** GET METHODS ************************* */

app.get('/next/books', (req, res) => {
  let showBooks, currentBooks, lastBooks, currentBookDisplay;
  if (!searchedBooks.length) {
    //Converting strings to valid numbers
    currentBookDisplay = parseInt(req.query.currentBookDisplay);
    lastBooks = currentBookDisplay;

    //Set the current index of books
    currentBooks = currentBookDisplay + 10;

    //Get the next 10 books to display
    showBooks = books.slice(currentBookDisplay, currentBooks);
  } else {
    //look through searched books
    //Converting strings to valid numbers
    currentBookDisplay = parseInt(req.query.currentBookDisplay);
    lastBooks = currentBookDisplay;

    //Set the current index of books
    currentBooks = currentBookDisplay + 10;

    //Get the next 10 books to display
    showBooks = searchedBooks.slice(currentBookDisplay, currentBookDisplay + 10);
  }

  res.status(200).send({ showBooks, lastBooks, currentBooks, maxBooks });
});

app.get('/previous/books', (req, res) => {
  let showBooks, currentBooks, lastBooks;

  let lastBookDisplay = parseInt(req.query.lastBookDisplay);

  if ((lastBookDisplay !== null || lastBookDisplay > 0) && !searchedBooks.length) {
    showBooks = books.slice(lastBookDisplay - 10, lastBookDisplay);

    if (lastBookDisplay - 10 <= 0) {
      lastBooks = null;
      currentBooks = 10;
    } else {
      lastBooks = lastBookDisplay - 10;
      currentBooks = lastBookDisplay;
    }
  } else if ((lastBookDisplay !== null || lastBookDisplay > 0) && searchedBooks.length) {
      showBooks = searchedBooks.slice(lastBookDisplay - 10, lastBookDisplay);

      if (lastBookDisplay - 10 <= 0) {
        lastBooks = null;
        currentBooks = 10;
      } else {
        lastBooks = lastBookDisplay - 10;
        currentBooks = lastBookDisplay;
      }
  }
  res.status(200).send({ showBooks, lastBooks, currentBooks });
})

app.get('/search/books', (req, res) => {
  //Reset searched books array to 0
  searchedBooks.length = 0;

  let searchLowerCase = req.query.search.toLowerCase();
  let showBooks, currentBooks, lastBooks, currentBookDisplay;

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.title.toLowerCase().includes(searchLowerCase)) {
      searchedBooks.push(book);
    }
  }
  if (searchedBooks.length > 0) {
    currentBookDisplay = parseInt(req.query.currentBookDisplay);
    currentBooks = currentBookDisplay + 10;
    lastBooks = currentBookDisplay;
    showBooks = searchedBooks.slice(currentBookDisplay, currentBooks);
    maxBooks = searchedBooks.length;

    res.status(200).send({ showBooks, lastBooks, currentBooks, maxBooks });
  }
})

app.get('/', (req, res) => {
  searchedBooks.length = 0;
  res.send(path.join(__dirname, '../client/public'));
})

/* ***************************************************************** */


app.listen(port, () => console.log('Connected to port:', port));
