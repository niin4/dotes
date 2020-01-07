const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const https = require('https');
const session = require('express-session');
const mongoose = require('mongoose');

// env
dotenv.config();

const uri = 'mongodb+srv://dbUser:' + process.env.MONGOPASS + '@' + process.env.MONGOAD + '?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('hi');
});

// Add session support
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
}));

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

require('./googleStrategy')(app);
// auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

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
