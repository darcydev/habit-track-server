const { Router } = require('express');

const router = Router();

const AuthController = require('../controllers/auth');

const { login, register } = AuthController;

router.post('/login', login);
router.post('/register', register);

module.exports = router;
