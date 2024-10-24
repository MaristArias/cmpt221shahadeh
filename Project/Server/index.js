const express = require("express");
const fs = require("fs"); // Import fs (File System)
const app = express();
const port = 3000;

const dataFilePath = './server/data.json'; // Path to store data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("Client/public"));

// Routes to serve HTML pages
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
  const formEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

  // Log the extracted data to the console
  console.log(`First Name submitted: ${formEntry.firstName}`);
  console.log(`Last Name submitted: ${formEntry.lastName}`);
  console.log(`Date of Birth submitted: ${formEntry.dateOfBirth}`);
  console.log(`Phone Number submitted: ${formEntry.phoneNumber}`);
  console.log(`Email submitted: ${formEntry.email}`);

  // Read existing data from the file
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error'); // Send error response
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
        return res.status(500).send('Error saving data'); // Send error response
      }

      // Send a success response after writing is done
      res.redirect("/login"); // Redirect to registration page
    });
  });
});

// Route to get stored data
app.get("/get_data", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading data'); // Send error response
    }

    res.json(JSON.parse(data)); // Send the stored data as JSON
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
