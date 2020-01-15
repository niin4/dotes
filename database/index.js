const mongoose = require('mongoose');

const uri = process.env.MONGOPASS + '@' + process.env.MONGOAD;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('> successfully opened the database');
});


module.exports = mongoose;
