const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.get('Authorization');
  // user is not authenticated
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    // TODO update key
    // TODO hide key
    decodedToken = jwt.verify(token, 'includeasupersecretkey');
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken;
  next();
};

module.exports = authenticate;
