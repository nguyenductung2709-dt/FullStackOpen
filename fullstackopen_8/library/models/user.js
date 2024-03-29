const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  favoriteGenre: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
