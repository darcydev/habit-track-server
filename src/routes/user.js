const { Router } = require('express');

const router = Router();

const UserController = require('../controllers/user');

router.post('/', UserController.getUser);
router.post('/edit', UserController.editUser);

module.exports = router;
