const Message = require('../../models/message')

const addMessage = (req, res) => {
  const message = {
    message: req.body.message
  }

  new Message(message)
    .save()
    .then(message => res.json({ msg: 'Mensagem salva' }))
    .catch(err => {
      res.status(400).json(err)
    })
}

module.exports = addMessage
