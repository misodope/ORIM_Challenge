const express = require('express');
const parser = require('body-parser');
const path = require('path');
const books = require('../books-test-collection.json');

const app = express();
const port = 3000;

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/all/books', (req, res) => {
  res.status(200).send(books);
})

app.listen(port, () => console.log('Connected to port:', port));
