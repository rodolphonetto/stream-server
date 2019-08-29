const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const messageRoutes = require('./routes/message')
const db = require('./config/keys').mongoURI

const app = express()

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
app.use('/messages', messageRoutes)

// abertura servidor
const server = app.listen(4000)
// Inicialização do socket
const io = require('./socket').init(server)
io.on('connect', socket => {
  console.log('User Connected')
})
