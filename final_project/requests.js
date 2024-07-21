const axios = require('axios');

async function getBooks() {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log('Books available in the shop:', response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }   
};

async function getBookWithISBN(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log('Books available in the shop:', response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }   
};

async function getBookWithAuthor(author) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log('Books available in the shop:', response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }   
};

async function getBookWithTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log('Books available in the shop:', response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }   
};

getBooks();
getBookWithISBN(1);
getBookWithAuthor('Chinua Achebe');
getBookWithTitle('Fairy tales');