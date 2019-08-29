const Message = require('../models/message')
const io = require('../socket')

exports.addMessage = async (req, res) => {
  const content = {
    message: req.body.message
  }

  const message = new Message({ message: content.message })
  try {
    await message.save()
    io.getIO().emit('message', content.message)
    res.status(201).json({
      info: 'Message saved!',
      message: content.message
    })
  } catch (erro) {
    res.status(400).json(erro)
  }
}
