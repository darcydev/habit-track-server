require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const isAuth = require('./middleware/is-auth');
const AuthRoute = require('./routes/auth');
const HabitRoute = require('./routes/habit');

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-4hv4e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error(`Connection error: ${err}`);
    process.exit();
  });

/* MIDDLEWARE */
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(isAuth);

/* ROUTES */
app.use('/api/user', AuthRoute);
app.use('/api/habit', HabitRoute);

// run the server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
