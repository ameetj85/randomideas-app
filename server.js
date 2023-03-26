const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// static folder
app.use(express.static(path.join(__dirname, 'public')));
// body parser middleware - Express v5 contains bodyParser to extract data from body of api request.
// Separate npm not reqd.
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// CORS middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Random Ideas API.',
  });
});

// middleware setup to route to ideas router
const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
