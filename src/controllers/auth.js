const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const logout = async (req, res, next) => {
  return true;
};

const login = async (req, res, next) => {
  // validate email
  const user = await User.findOne({ email: req.body.email });
  // validate password
  const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
  // return generic error message
  if (!user || !passwordCorrect) {
    res.json({ message: 'Email or password not correct' });
  } else {
    const token = await jwt.sign({ userID: user.id, email: user.email }, 'includeasupersecretkey', { expiresIn: '5h' });
    res.json({ userID: user.id, token, tokenExpiration: 1 });
  }
};

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.json({ message: 'Email already taken' });
      throw new Error('Email already taken!');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      const result = await user
        .save()
        .then((user) => {
          const token = jwt.sign({ userID: user.id, email: user.email }, 'includeasupersecretkey', { expiresIn: '5h' });
          return token;
        })
        .then((token) => {
          res.json({ message: 'User added successfully!', user: user, token });
        })
        .catch((error) => {
          res.json({ message: `An error occurred: ${error}` });
        });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { logout, login, register };
