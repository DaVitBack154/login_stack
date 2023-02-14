const express = require('express');
const router = express.Router();
const { register, login, getprofileID } = require('../controller/api');
const authToken = require('../middleware/auth');

router.get('/Test', (req, res) => {
  res.status(200).send('Tokota');
});

router.post('/register', register);

router.post('/login', login);

router.get('/getprofile', authToken, getprofileID);

module.exports = router;
