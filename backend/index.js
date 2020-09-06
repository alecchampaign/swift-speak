const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

const User = require('./db.js');

const PORT = process.env.PORT || 3000;

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser());

app.post('/user', (req, res) => {
  const newUser = User({ username: req.body.username, exp: 0, token: req.body.token });
  newUser.save((err, newUser) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    res.status(201).json(newUser);
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));