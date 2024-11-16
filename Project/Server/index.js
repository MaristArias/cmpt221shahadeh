const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const mainController = require("./controllers/MainController");
const accountController = require("./controllers/AccountController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Client/public"));

const dataFilePath = "./server/data.json";

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "./Client/views" });
});

app.get("/loggedin", (req, res) => {
  res.sendFile("loggedin.html", { root: "./Client/views" });
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

app.get("/data.json", (req, res) => {
  res.sendFile("data.json", { root: "./Server" });
});

// app.get("/api/data", mainController.getData);
// app.get("/api/data/:id", mainController.viewDetail);
app.post("/api/user", accountController.createAccount);
app.patch("/api/user/:id", accountController.updateAccount);
app.delete("/api/user/:id", accountController.deleteAccount);

app.post("/submit_form", (req, res) => {
  const formEntry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

    //log the extracted data to the console
    console.log(`First Name submitted: ${formEntry.firstName}`);
    console.log(`Last Name submitted: ${formEntry.lastName}`);
    console.log(`Date of Birth submitted: ${formEntry.dateOfBirth}`);
    console.log(`Phone Number submitted: ${formEntry.phoneNumber}`);
    console.log(`Email submitted: ${formEntry.email}`);
    
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    let jsonData = [];
    if (data.length > 0) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(formEntry);

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving data");
      }

      res.redirect("/login");
    });
  });
});

app.get("/get_data", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading data");
    }

    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
