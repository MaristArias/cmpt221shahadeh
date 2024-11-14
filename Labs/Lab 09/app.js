const express = require('express'); // Import Express.js
const cookieParser = require('cookie-parser'); // Import cookie-parser
const session = require('express-session'); // Import express-session
const passport = require('passport'); // Import Passport.js
const LocalStrategy = require('passport-local').Strategy; // Import Passport Local Strategy

const app = express(); // Create an Express application
const port = 3000; // Define the port number

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle sessions
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Define the local strategy for Passport
passport.use(
  new LocalStrategy(function (username, password, done) {
    // Check if the username and password are correct
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' }); // Authentication successful
    } else {
      return done(null, false, { message: 'Incorrect credentials.' }); // Authentication failed
    }
  })
);

// Serialize user information into the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(function (id, done) {
  done(null, { id: 1, username: 'user' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


app.get('/', (req, res) => {
  res.send('Welcome to the Express.js Lab!');
});

app.get('/set-cookie', (req, res) => {
  res.cookie('name', 'express');
  res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
  const name = req.cookies.name;
  res.send(`Cookie value: ${name}`);
});

app.get('/set-session', (req, res) => {
  req.session.user = 'express-user';
  res.send('Session has been set');
});

app.get('/get-session', (req, res) => {
  const user = req.session.user;
  res.send(`Session value: ${user}`);
});

app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username"/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password"/>
      </div>
      <div>
        <input type="submit" value="Login"/>
      </div>
    </form>
  `);
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// This will generate an error
app.get('/throw-error', (req, res, next) => {
  next(new Error('An error has occurred'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Lab!');
  });
  
app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'express');
    res.send('Cookie has been set');
});
  
app.get('/get-cookie', (req, res) => {
    const name = req.cookies.name;
    res.send(`Cookie value: ${name}`);
});
  
app.get('/set-session', (req, res) => {
    req.session.user = 'express-user';
    res.send('Session has been set');
});
  
app.get('/get-session', (req, res) => {
    const user = req.session.user;
    res.send(`Session value: ${user}`);
});
  
app.get('/login', (req, res) => {
res.send(`
  <form action="/login" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username"/>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password"/>
    </div>
    <div>
      <input type="submit" value="Login"/>
    </div>
  </form>
 `);
});
  
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
  
app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});
  
  // This will generate an error
app.get('/throw-error', (req, res, next) => {
    next(new Error('An error has occurred'));
});
  
app.use((err, req, res, next) => {
 console.error(err.stack);
res.status(500).send('Something broke!');
});
  

//value is "express"

//session value is "express-user"

/* error thrown is
    Something broke!
    Error: An error has occurred
    at C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\app.js:113:8
    at Layer.handle [as handle_request] (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\layer.js:95:5)
    at C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\index.js:284:15
    at Function.process_params (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\index.js:346:12)
    at next (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\express\lib\router\index.js:280:10)
    at strategy.pass (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\passport\lib\middleware\authenticate.js:355:9)
    at SessionStrategy.authenticate (C:\Users\shaha\Desktop\New folder\cmpt221shahadeh\Labs\Lab 09\node_modules\passport\lib\strategies\session.js:126:10)

*/