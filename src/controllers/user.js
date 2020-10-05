const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUser = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      res.json({ error: 'User is not authenticated' });
    }

    const user = await User.findOne({ _id: req.body.userID });

    if (!user) {
      res.json({ success: false, message: 'User not found', body: req.body });
    } else {
      res.json({ success: true, user });
    }
  } catch (err) {
    throw err;
  }
};

const editUser = async (req, res, next) => {
  try {
    if (!req.isAuth) res.json({ error: 'User is not authenticated' });

    const user = await User.findOne({ email: req.body.email });
    const passwordCorrect = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!user || !passwordCorrect) {
      res.json({ success: false, message: 'User not found or current password not correct', body: req.body });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

      const updatedUser = await findOneAndUpdate(
        { email: req.body.email },
        { email: req.body.email, password: hashedPassword },
        { returnNewDocument: true }
      )
        .then((updatedUser) => {
          console.log('updatedUser :>> ', updatedUser);
        })
        .catch((err) => console.error(err));

      // res.json({ success: true, message: 'User account details updated', user });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { getUser, editUser };
