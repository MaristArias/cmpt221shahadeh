const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("Client/public"));

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "./Client/views" });
});

app.get("/home", (req, res) => {
  res.sendFile("home.html", { root: "./Client/views" });
});

app.get("/registration", (req, res) => {
  res.sendFile("registration.html", { root: "./Client/views" });
});

app.get("/profile", (req, res) => {
  res.sendFile("profile.html", { root: "./Client/views" });
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./Client/views" });
});

app.post('/submit_form', (req, res) => {
    
  // Extract the form fields from the submitted data
  const firstName = req.body['First Name'];      // Extract the 'First Name' field
  const lastName = req.body['Last Name'];        // Extract the 'Last Name' field
  const dateOfBirth = req.body['Date of Birth']; // Extract the 'Date of Birth' field
  const phoneNumber = req.body['Phone Number'];   // Extract the 'Phone Number' field
  const email = req.body['Email'];                // Extract the 'Email' field

  // Log the extracted data to the console (for debugging)
  console.log(`First Name submitted: ${firstName}`);
  console.log(`Last Name submitted: ${lastName}`);
  console.log(`Date of Birth submitted: ${dateOfBirth}`);
  console.log(`Phone Number submitted: ${phoneNumber}`);
  console.log(`Email submitted: ${email}`);

  // Send a response back to the client confirming successful submission
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
