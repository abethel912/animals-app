require('dotenv').config()// load variables from .env into process.env
const express = require('express')// backend framework
const app = express()// create the express app object
const animals = require('./models/animals.js')// import animal data
const data = require('./models/animals.js')
const PORT = process.env.PORT || 3014
const methodOverride = require('method-override')

// Allows you to use data from the URL
// URLencoded - is the data in the URL
// Need this to use the request.params and request.query
app.use(express.urlencoded({ extended: true }))
// To use the public folder, with /public in the URL we need to use the express.static middleware
app.use('/public', express.static('public'))

// INDEX
app.get('/animals', (req, res) => {
  res.render('index.ejs', { data: animals })
})

// New - GET /animals/new
app.get('/animals/new', (req, res) => {
  res.render('new.ejs', { data: animals })
})

// Destroy - DELETE /animals/:id
app.delete('/animals/:indexOfAnimalsArray', (req, res) => {
  animals.splice(req.params.id.indexOfAnimalsArray, 1) //remove the item from the array
  res.redirect('/animals') //redirect back to index route
})

  // SHOW // GET /animals/:id
  app.get('/animals/:id', (req, res) => {
    res.render('show.ejs', animals[req.params.id] )
  })

  // Create-POST /animals
  app.post('/animals', (req, res) => {
    req.body.type = [req.body.type]
    data.push(req.body), res.redirect('/animals')
  })

  //Update - PUT /animals/:id

  app.put('/animals/:id', (req, res) => {
    data.update(req.params.id, req.body)
    res.redirect('/animals')
  })

  // Listener

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })

