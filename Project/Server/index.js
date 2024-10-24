const express = require("express");
const app = express();
const port = 3000;

const dataFilePath = './data.json';
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Optional for parsing JSON data

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

// POST route to handle form submissions
app.post("/submit_form", (req, res) => {
  const firstName = req.body.firstName; // Access the first name
  const lastName = req.body.lastName; // Access the last name
  const dateOfBirth = req.body.dateOfBirth; // Access the date of birth
  const phoneNumber = req.body.phoneNumber; // Access the phone number
  const email = req.body.email; // Access the email

  // Log the extracted data to the console
  console.log(`First Name submitted: ${firstName}`);
  console.log(`Last Name submitted: ${lastName}`);
  console.log(`Date of Birth submitted: ${dateOfBirth}`);
  console.log(`Phone Number submitted: ${phoneNumber}`);
  console.log(`Email submitted: ${email}`);


  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    
    // Parse the existing data
    let jsonData = [];
    if (data.length > 0) {
      jsonData = JSON.parse(data);
    }

    // Add new entry
    jsonData.push(formEntry);

    // Write updated data back to the file
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving data');
      }
    });
  });

  // Send a success response back to the client
  res.redirect("/registration");
});

app.get("/get_data", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading data');
    }

    res.json(JSON.parse(data)); // Send the stored data as JSON
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
