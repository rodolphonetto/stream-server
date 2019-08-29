const express = require('express')
const messageController = require('../controllers/message')

const router = express.Router()

router.post('/add-message', messageController.addMessage)

module.exports = router
