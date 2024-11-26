const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Random Number Route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Libs Route
server.post('/ITC505/lab-7', (req, res) => {
  const { 
    adjective = '', 
    pluralNoun = '', 
    verb = '', 
    adverb = '', 
    bodyPart = '' 
  } = req.body;

  // Improved validation
  if (!adjective || !pluralNoun || !verb || !adverb || !bodyPart) {
    return res.status(400).send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
  }

  // Mad Libs story template
  const madLib = `Once upon a time, there was a ${adjective} explorer who loved to ${verb} among ${pluralNoun}. 
  ${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} trembling with excitement, they moved ${adverb} 
  through the mysterious landscape, seeking adventure and wonder.`;

  res.send(`
    <h1>Mad Libs Adventure!</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Port configuration
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => console.log(`Ready on localhost:${port}!`))