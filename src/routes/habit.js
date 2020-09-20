const { Router } = require('express');

const router = Router();

const HabitController = require('../controllers/habit');

router.get('/', HabitController.get);
router.post('/create', HabitController.create);
// router.post('/update', HabitController.update);
// router.post('/delete', HabitController.delete);

module.exports = router;
