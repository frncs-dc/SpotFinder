const express = require('express')
const{getDb, connectToDb} = require('./db')

// init app & middleware
const server = express()


// db connection
let db

connectToDb((err) => {
  if(!err){
    server.listen(3000, () => {
      console.log('server listening on port 3000')
    })
    db = getDb()
  }
})

// routes
server.get('/parkSpot', (req, res) => {
  res.json({mssg: "welcome to the api"});
})