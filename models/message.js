const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Message', messageSchema)
