const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const https = require('https');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())
// env
dotenv.config();

// db
require('./database');

/* Add session support
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
}));*/

// Checks if a user is logged in
const accessProtectionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: 'must be logged in to continue',
    });
  }
};

require('./auth/authStrategy')(app);
// auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// api routes TODO: move elsewhere

app.get('/protected', accessProtectionMiddleware, (req, res) => {
  res.json({
    message: 'You have accessed the protected endpoint!',
    yourUserInfo: req.user,
  });
});
// static routes
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));

https.createServer({
  key: fs.readFileSync('../certs/' + process.env.SERVER_KEY),
  cert: fs.readFileSync('../certs/' + process.env.SERVER_CERT),
}, app)
  .listen(process.env.PORT, function() {
    console.log('Dotes server running~');
  });
// app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
