const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!isValid(username)) {
    res.status(400).json({ message: 'Invalid username'});
  }
  users.push({ username, password });
  res.send({ message: `User ${username} registered` });
});

// Get the book list available in the shop
public_users.get('/', (_, res) => {
  const listOfBooks = Object.values(books).map(x => x.title);
  res.send(JSON.stringify(listOfBooks, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null, 4));
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;

  const book = Object.values(books).filter(x => x.author === author);
  res.send(JSON.stringify(book, null, 4));
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;

  const book = Object.values(books).filter(x => x.title === title);
  res.send(JSON.stringify(book, null, 4));
});

//  Get book review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  const book = books[isbn];
  res.send({ reviews: book.reviews });
});

module.exports.general = public_users;
