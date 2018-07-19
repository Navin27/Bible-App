var mongoose  = require('mongoose');

var Schema = new mongoose.Schema({

});

var Book = mongoose.model('books', Schema, 'books');

module.exports = Book;
