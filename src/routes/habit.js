const { Router } = require('express');

const router = Router();

const HabitController = require('../controllers/habit');

router.get('/all', HabitController.all);
router.post('/user', HabitController.user);
router.post('/create', HabitController.create);
// router.post('/update', HabitController.update);
// router.post('/delete', HabitController.delete);

module.exports = router;
