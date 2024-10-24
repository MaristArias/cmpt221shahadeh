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
  const firstName = req.body['First Name']; // Access the first name
  const lastName = req.body['Last Name'];   // Access the last name
  const dateOfBirth = req.body['Date of Birth']; // Access the date of birth
  const phoneNumber = req.body['Phone Number']; // Access the phone number
  const email = req.body['Email']; // Access the email

  // Log the extracted data to the console
  console.log(`First Name submitted: ${firstName}`);
  console.log(`Last Name submitted: ${lastName}`);
  console.log(`Date of Birth submitted: ${dateOfBirth}`);
  console.log(`Phone Number submitted: ${phoneNumber}`);
  console.log(`Email submitted: ${email}`);

  // Send a success response back to the client
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
