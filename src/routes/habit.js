const { Router } = require('express');

const router = Router();

const HabitController = require('../controllers/habit');

const { getUserHabits, createHabit } = HabitController;

router.post('/getUserHabits', getUserHabits);
// router.post('/get', getHabit);
router.post('/create', createHabit);
// router.post('/edit', editHabit);
// router.post('/delete', deleteHabit);

module.exports = router;
