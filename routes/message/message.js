const express = require('express')
const addMessage = require('./addMessage')

const router = express.Router()

router.post('/add-message', (req, res) => {
  addMessage(req, res)
})

module.exports = router
