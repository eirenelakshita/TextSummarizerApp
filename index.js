const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js')
const generateImg = require('./generateimg.js')

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Handle POST requests to the '/summarize' endpoint

app.post('/summarize', (req, res) => {

   // TODO: handle POST /summarize request
   // get the text_to_summarize property from the request body
   const text = req.body.text_to_summarize;
   summarizeText(text)
   .then(response => {
      res.send(response); // Send the summary text as a response
   })
   .catch(error => {
      console.log(error.message);
   })
});

app.post('/generateimg', (req, res) => {

   // TODO: handle POST /summarize request
   // get the text_to_summarize property from the request body
   const longText = req.body.text_to_summarize;
   const text = longText.split(' ')[0];
   generateImg(text)
   .then(response => {
      res.send(response); // Send the image as a response
   })
   .catch(error => {
      console.log(error.message);
   })
});

// Start the server
app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`);
});
