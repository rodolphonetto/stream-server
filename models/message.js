const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  }
},
{ timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Message', messageSchema)
