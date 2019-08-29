const express = require('express')
const app = express()
const http = require('http').createServer(app)

const mongoose = require('mongoose')
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const message = require('./routes/message/message')
const db = require('./config/keys').mongoURI

// conexão banco
mongoose
  .connect(db)
  .then(console.log('MongoDB conectado'))
  .catch(err => console.log(err))

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*, GET, POST, OPTIONS, PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    '*, Content-Type, Authorization'
  )
  next()
})

// Body parsers (forms)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// rota das Mensagens
app.use('/messages', message)

// Abertura do socket
io.on('connection', socket => {
  socket.on('mensagem', msg => {
    io.emit('mensagem', msg)
    console.log(msg)
  })
})

// abertura servidor
http.listen(4000, () => {
  console.log('listening on port 4000')
})
