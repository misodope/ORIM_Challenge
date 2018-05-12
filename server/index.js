const express = require('express');
const parser = require('body-parser');
const path = require('path');
const books = require('../data/books-test-collection.json');

const app = express();
const port = 3000;

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

/* ************************** GET METHODS ************************* */
//Setting globally accessible searchedBooks array, and maxBooks lengths.
let maxBooks = books.length;
let searchedBooks = []

app.get('/next/books', (req, res) => {
  let showBooks;
  let currentBookDisplay = parseInt(req.query.currentBookDisplay);
  let lastBooks = currentBookDisplay;
  let currentBooks = currentBookDisplay + 10;
  //If there are no books that have been searched for, look at whole collection of books
  if (!searchedBooks.length) {
    showBooks = books.slice(currentBookDisplay, currentBooks);
  } else {
    //Else books there are searched books, look at the current searched books.
    showBooks = searchedBooks.slice(currentBookDisplay, currentBooks);
  }

  res.status(200).send({ showBooks, lastBooks, currentBooks, maxBooks });
});

app.get('/previous/books', (req, res) => {
  let showBooks, currentBooks, lastBooks;

  let lastBookDisplay = parseInt(req.query.lastBookDisplay);
  //If there are no searched books, look at the entire book collection
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
  //Reset searched books array to 0 everytime a new search happens.
  searchedBooks.length = 0;
  //Set searched query to all lowercase letters
  let searchLowerCase = req.query.search.toLowerCase();
  //Intialize books index variables
  let showBooks, currentBooks, lastBooks, currentBookDisplay;
  //Loops through each book and check if the book title includes the search query.
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.title.toLowerCase().includes(searchLowerCase)) {
      searchedBooks.push(book);
    }
  }
  //If there are searchedBooks set the indexes and look at the searchedBooks array.
  if (searchedBooks.length > 0) {
    currentBookDisplay = parseInt(req.query.currentBookDisplay);
    currentBooks = currentBookDisplay + 10;
    lastBooks = currentBookDisplay;
    maxBooks = searchedBooks.length;
    showBooks = searchedBooks.slice(currentBookDisplay, currentBooks);

    res.status(200).send({ showBooks, lastBooks, currentBooks, maxBooks });
  } else {
    res.status(404).send();
  }
})

app.get('/', (req, res) => {
  searchedBooks.length = 0;
  res.send(path.join(__dirname, '../client/public'));
})

/* ***************************************************************** */


app.listen(port, () => console.log('Connected to port:', port));
