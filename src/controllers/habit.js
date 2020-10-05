const Habit = require('../models/habit');

const transformHabit = (habit) => {
  return {
    ...habit._doc,
    _id: habit.id,
    /* client: client.bind(this, job._doc.client), */
  };
};

/* const all = async (req, res, next) => {
  if (!req.isAuth) {
    res.json({ success: false, message: 'User is not authenticated' });
  } else {
    try {
      const habits = await Habit.find();
      res.json(habits.map((habit) => transformHabit(habit)));
    } catch (error) {
      throw error;
    }
  }
}; */

const getUserHabits = async (req, res, next) => {
  if (!req.isAuth) {
    res.json({ error: 'User is not authenticated' });
  } else {
    try {
      const habits = await Habit.find({ user: req.body.userID });
      res.json(habits.map((habit) => transformHabit(habit)));
    } catch (error) {
      res.json({ success: false, message: error });
    }
  }
};

const createHabit = async (req, res, next) => {
  if (!req.isAuth) {
    res.json({ success: false, error: 'User is not authenticated' });
  }

  const { user, title, description } = req.body;

  if (!user || !title || !description) {
    res.json({ success: false, error: 'Please complete required fields' });
  }

  const habit = new Habit({
    title,
    description,
    user,
  });

  try {
    const result = await habit.save();

    res.json(transformHabit(result));

    return transformHabit(result);
  } catch (error) {
    throw error;
  }
};

module.exports = { all, getUserHabits, createHabit };
