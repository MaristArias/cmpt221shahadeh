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

app.post("/submit_form", (req, res) => {
  const firstName = req.body["First Name"]; // Access the first name
  const lastName = req.body["Last Name"]; // Access the last name
  const dateOfBirth = req.body["Date of Birth"]; // Access the date of birth
  const phoneNumber = req.body["Phone Number"]; // Access the phone number
  const email = req.body["Email"]; // Access the email

  // Log the extracted data to the console
  console.log(`First Name submitted: ${firstName}`);
  console.log(`Last Name submitted: ${lastName}`);
  console.log(`Date of Birth submitted: ${dateOfBirth}`);
  console.log(`Phone Number submitted: ${phoneNumber}`);
  console.log(`Email submitted: ${email}`);

  // Send a success response back to the client
  res.send("Form submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/* TypeError: Cannot read properties of undefined (reading 'First Name')
    at /Users/damanjit/Downloads/cmpt221shahadeh/Project/Server/index.js:28:29
    at Layer.handle [as handle_request] (/Users/damanjit/node_modules/express/lib/router/layer.js:95:5)
    at next (/Users/damanjit/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (/Users/damanjit/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (/Users/damanjit/node_modules/express/lib/router/layer.js:95:5)
    at /Users/damanjit/node_modules/express/lib/router/index.js:284:15
    at Function.process_params (/Users/damanjit/node_modules/express/lib/router/index.js:346:12)
    at next (/Users/damanjit/node_modules/express/lib/router/index.js:280:10)
    at serveStatic (/Users/damanjit/node_modules/serve-static/index.js:75:16)
    at Layer.handle [as handle_request] (/Users/damanjit/node_modules/express/lib/router/layer.js:95:5)*/
