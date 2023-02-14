const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports.register = async (req, res) => {
  try {
    const { username, password, name, surname } = req.body;
    const salt = await bcrypt.genSalt(8);
    user = new User({
      username,
      password,
      name,
      surname,
    });
    //Encry
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.json({ status: true, data: user });
  } catch (error) {
    res.status(500).send('server filed');
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOneAndUpdate({ username }, { new: true });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).send('Password invalid');
      }
      //Payload
      const payload = {
        user: {
          username: user.username,
          name: user.name,
          surname: user.surname,
          role: user.role,
        },
      };
      //Generate Token
      jwt.sign(payload, 'jwttokota', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ status: true, data: token, payload });
      });

      //   return res.json({ status: true, message: 'Loginsuccess' });
    } else {
      return res.json({ status: 400, message: 'User not Found' });
    }
  } catch (error) {
    res.status(500).send('server filed');
  }
};

module.exports.getprofileID = async (req, res) => {
  try {
    console.log('verifyaaa', req.user);
    let username = req.user.username;
    console.log('username', username);
    let result = await User.findOne({
      username: username,
    });
    return res.json({ status: true, data: result });
  } catch (error) {
    res.status(500).send('server filed');
  }
};
