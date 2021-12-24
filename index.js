const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors=require('cors')

// Import models
const Post = require('./src/models/post');

// Define application
const app = express()

// Define DB Connection
const db = mongoose.connect('mongodb://localhost:27017/first-node-api-db')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  // handle the request for root route
  res.send("HELLO WORLD")
})

// Operations: Create, Read, Update, Delete (CRUD)
app.post('/posts', function(req, res) {
  // Get values from request payload
  const title = req.body.title
  const author = req.body.author
  const content = req.body.content

  // Assign values to Post model
  var post = new Post();
  post.title = title
  post.author = author
  post.content = content

  // Save the post
  post.save(function(error, savedPost) {
    if(error) {
      // send error response
      res.status(500).send({ error: 'Unable to save Post '})
    } else {
      // send success response
      res.status(200).send(savedPost)
    }
  })
});

// Get list of all posts
app.get('/posts', function(req, res) {
  Post.find({}, function(error, posts) {
    if(error) {
      // send error response
      res.status(422).send({ error: 'Unable to fetch posts '})
    } else {
      // send success response
      res.status(200).send(posts)
    }
  })
})

// Update the posts
//To update all documents that meets the criteria of the query, we can use the updateMany() method
var myquery = { title: "First API Call" };
var newvalues = { $set: {author: "Harry Potter", content: "Hogwarts" } };
app.put('/posts', function(req, res) {
Post.updateOne(myquery, newvalues, function(error, posts) {
    if(error) {
        // send error response
        res.status(422).send({ error: 'Unable to update posts '})
      } else {
        // send success response
        res.status(200).send(posts)
      }
    })
})

// Delete the posts
//To delete more than one document, we can use the deleteMany() method
var delquery = { title: 'First API Call' };
app.delete('/posts', function(req, res) {
Post.deleteOne(delquery, function(error) {
    if(error) {
        // send error response
        res.status(422).send({ error: 'Unable to delete posts'})
      } else {
        // send success response
        res.status(200).send("Post deleted Successfully!!!Check your database")
      }
    })
})
app.listen(3001, function() {
  console.log('Server is running at port 3001....')
})