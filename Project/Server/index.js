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

app.post(`/submit_form`, function (req, res) {
  const name = req.body.name;
  console.log(`Name submitted: ${name}`);
  res.send(`Form Submitted Successfully!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
