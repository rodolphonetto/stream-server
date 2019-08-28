const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Message = require("../models/message");

const addMessage = (req, res) => {
  const message = {};

  if (req.body.message) message.message = req.body.message;

  new Message(message)
    .save()
    .then(message => console.log("teste"))
    .catch(err => {
      res.status(400).json(err);
    });
};

router.post("/add-message", (req, res) => {
  addMessage(req, res);
});

module.exports = router;