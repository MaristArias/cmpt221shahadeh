const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const mainController = require("./controllers/MainController");
const accountController = require("./controllers/AccountController");

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/'; // replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Using express built-in middleware for handling URL-encoded data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JavaScript, etc.) from the 'public' folder
app.use(express.static("Client/public"));

// Path to the data file
const dataFilePath = "./Server/data.json";

app.post('/register', (req, res) => {
  console.log('Received registration request:', req.body);
  // This is the response message sent back to the client
  res.json({ message: 'Registration successful' });
});

// Route for the home page (index)
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./Client/views" });
});

// Static route for loggedin.html
app.get("/loggedin", (req, res) => {
  res.sendFile("loggedin.html", { root: "./Client/views" });
});

// Static route for home.html
app.get("/home", (req, res) => {
  res.sendFile("home.html", { root: "./Client/views" });
});

// Static route for registration.html
app.get("/registration", (req, res) => {
  res.sendFile("registration.html", { root: "./Client/views" });
});

// Static route for profile.html
app.get("/profile", (req, res) => {
  res.sendFile("profile.html", { root: "./Client/views" });
});

// Static route for login.html
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./Client/views" });
});

// Serve data.json file
app.get("/data.json", (req, res) => {
  res.sendFile("data.json", { root: "./Server" });
});

// API Routes for data
const apiRouter = express.Router();

// Route to get all data from data.json
apiRouter.get("/data", mainController.getData);

// Route to get a single article by ID
apiRouter.get("/data/:id", mainController.getId);

// Routes for user operations (create, update, delete)
apiRouter.post("/users", accountController.createAccount);
apiRouter.patch("/user/:id", accountController.updateAccount);
apiRouter.delete("/users/:id", accountController.deleteAccount);


// Mount the API router on "/api"
app.use("/api", apiRouter);

// Form submission route (to handle registration data)
app.post("/submit_form", async (req, res) => {
  const { firstName, lastName, dateOfBirth, phoneNumber, email } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email) {
    return res.status(400).send("Missing required fields");
  }

  // Create the form entry object
  const formEntry = { firstName, lastName, dateOfBirth, phoneNumber, email };

  try {
    // Read the existing data from data.json
    const data = await fs.promises.readFile(dataFilePath, "utf-8");
    const jsonData = data.length ? JSON.parse(data) : [];

    // Append the new entry to the data
    jsonData.push(formEntry);

    // Write the updated data back to data.json
    await fs.promises.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));

    console.log(`Data saved for: ${formEntry.firstName} ${formEntry.lastName}`);
    res.redirect("/login");
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).send("Server error");
  }
});

// Route to fetch all user data (e.g., for profile view or admin functionality)
app.get("/get_data", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error reading data");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).send("Error parsing JSON data");
    }
  });
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
