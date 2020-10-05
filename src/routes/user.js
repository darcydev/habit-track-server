const { Router } = require('express');

const router = Router();

const UserController = require('../controllers/user');

const { getUser, editUser, deleteUser } = UserController;

router.post('/', getUser);
router.post('/editUser', editUser);
router.post('/deleteUser', deleteUser);

module.exports = router;
