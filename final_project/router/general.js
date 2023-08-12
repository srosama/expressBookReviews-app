const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password

  if (users.includes(username)) {
    console.log(users)
    return res.status(403).json({"error":"username already in use"});
  }

  else{
    users.push(username, password)
    return res.status(200).json({successfully: `User have been registered successfully ${username}`});
  }


});








// get all the books
public_users.get('/',function (req, res) {
  const Allbooks = books
  return res.status(300).json({message: Allbooks});
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  for (const [key, value] of Object.entries(books)) {
    if (isbn === key){ 
      return res.status(300).json({books: value});
    }
  }
  return res.status(404).json({"Error":"NOT FOUND!!"})
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  for (const [key, value] of Object.entries(books)){
    if (author === value['author']){
      return res.status(200).json({message: value})
    }
  }
  return res.status(300).json({Error: "AUTHOR NOT FOUND!!"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const author = req.params.title
  for (const [key, value] of Object.entries(books)){
    if (author === value['title']){
      return res.status(200).json({message: value})
    }
  }
  return res.status(300).json({Error: "AUTHOR NOT FOUND!!"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  for (const [key, value] of Object.entries(books)) {
    if (isbn === key){ 
      return res.status(200).json({review: value['reviews']});
    }
  }
  return res.status(404).json({"Error":"NOT FOUND!!"})
});

module.exports.general = public_users;
