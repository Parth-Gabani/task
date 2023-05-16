  const express = require('express')
  const app = express()
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  app.use(express.json());
  const port = process.env.PORT || 5000
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  const passport = require('passport')
  const { User } = require('./config/db');
  const task = require('./routes/route')

  app.use(passport.initialize())
  app.use('/task',task);

  app.listen(port , (req,res) => {
    console.log(`Running on port ${port}`);
  })