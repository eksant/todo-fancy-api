const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

var todoSchema = new Schema({
  UserId: { 
    type: Schema.Types.ObjectId, 
    ref: 'users' 
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  status: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('todos', todoSchema)