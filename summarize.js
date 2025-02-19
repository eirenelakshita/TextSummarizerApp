// This is the function where the call to the API is made.
// It takes in the text to summarize and the number of sentences to return.
async function summarizeText(text) {
  //
  const axios = require('axios');

  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/philschmid/bart-large-cnn-samsum',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data : data
  };
  
  try {
    const response = await axios.request(config);
    //console.log(response.data[0].summary_text);
    return response.data[0].summary_text;
  }
  catch (err) {
    console.log(err);
  }
}

// Allows for summarizeText() function to be called from the index.js file.
module.exports = summarizeText; 