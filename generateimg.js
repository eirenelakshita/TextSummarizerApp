async function generateImg(text) {
  const axios = require('axios');
  let data = JSON.stringify({
    "inputs": text
  });

  let config = {
    method: 'post',
    // maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    body : data
  };

  try {
    const response = await axios.request(config);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = generateImg;