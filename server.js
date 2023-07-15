const express = require('express')

// init app & middleware
const server = express()

server.listen(3000, () => {
  console.log('server listening on port 3000')
})

// routes
server.get('/parkSpot', (req, res) => {
  res.json({mssg: "welcome to the api"});
})