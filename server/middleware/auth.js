const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(403).send('Access Denied');
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, 'jwttokota');
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
