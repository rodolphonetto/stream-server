const express = require("express");
const mongoose = require("mongoose");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

const message = require("./routes/message");

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*, GET, POST, OPTIONS, PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*, Content-Type, Authorization"
  );
  next();
});

io.on("connection", socket => {
  socket.on("mensagem", msg => {
    io.emit("mensagem", msg);
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/messages", message);

http.listen(4000, () => {
  console.log("listening on port 4000");
});
