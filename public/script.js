const textArea = document.getElementById('text_to_summarize');
const summarizedTextArea = document.getElementById('summary');
const submitButton = document.getElementById("submit-button");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

// First, we disable the submit button by default when the user loads the website.
submitButton.disabled = true;
submitButton2.disabled = true;

// Next, we define a function called verifyTextLength(). This function will be called when the user enters something in the text area. It receives an event, called ‘e’ here
function verifyTextLength(e) {
  const textarea = e.target;

// Check if the text in the text area is the right length - between 200 and 100,000 characters
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false; // Enable the submit button
  } else {
    submitButton.disabled = true;
    // Disable the submit button
  }
}


function submitData(e) {

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Removed extra append on myHeaders from postman code snippet because we already assign authorization on summarize.js and it's buggy to put it here.

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Send the text to the server using fetch API

  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  

  fetch("/summarize", requestOptions)
    .then((response) => response.text()) // Response will be summarized text
    .then((summary) => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch((error) => console.error(error));
};