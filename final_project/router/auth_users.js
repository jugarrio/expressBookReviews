const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = username => !users.some(x => x['username'] === username);


const authenticatedUser = (username, password) => {
  const user = users.find(x => x['username'] === username);
  if (user) {
    return user['password'] === password;
  }
  return false;
};

//only registered users can login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: 'Error logging in' });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT
    const accessToken = jwt.sign({
      data: password
    }, 'access', {expiresIn: 60 * 60});
    // Store access token and username in session
    req.session.authorization = {
      accessToken, username
  };
  return res.status(200).send('User successfully logged in');
} else {
    return res.status(208).json({ message: 'Invalid Login. Check username and password' });
}
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;

  const book = books[isbn];
  book.reviews = review;
  res.json({ message: `Review corresponding to ISBN: ${isbn} updated` });
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  const book = books[isbn];

  book.reviews = '';
  res.json({message: `Review corresponding to ISBN: ${isbn} deleted`});
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
