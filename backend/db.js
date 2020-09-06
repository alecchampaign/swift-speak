const mongoose = require('mongoose');
const url = process.env.dbUrl || 'mongodb+srv://dbAlec:dbAlec@cluster0.pyd6i.mongodb.net/swift-speak?retryWrites=true&w=majority';

mongoose.connect(url, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Mongoose successfully connected');
});

const userSchema = mongoose.Schema({
  username: String,
  token: String,
  exp: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;