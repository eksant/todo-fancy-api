const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, 'Email address already used'],
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address']
  },
  picture: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('users', userSchema)