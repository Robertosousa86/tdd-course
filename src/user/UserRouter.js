const express = require('express');
const router = express.Router();

const User = require('./User');
const bcrypt = require('bcrypt');

router.post('/api/1.0/users', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hash };
  await User.create(user);
  return res.send({ message: 'User created.' });
});

module.exports = router;
