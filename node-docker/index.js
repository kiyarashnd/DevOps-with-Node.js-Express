const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { createClient } = require('redis');
const ConnectRedis = require('connect-redis').RedisStore;
const cors = require('cors');

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require('./config/config');

const redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
  legacyMode: false,
});

redisClient.connect().catch(console.error);

// Initialize store
const redisStore = new ConnectRedis({
  client: redisClient,
  prefix: 'sess:',
});

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const conncetWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log('succesfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(conncetWithRetry, 5000);
    });
};

conncetWithRetry();

//app.use(session : ) exists on express for every request read data from session
//with store:redisStore we use redis for set data on session
//below app.use is middleware
app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60000,
      sameSite: 'lax',
    },
  })
);

app.enable('trust proxy');
app.use(cors({}));

// Add this middleware to check session
app.use((req, res, next) => {
  if (!req.session) {
    console.error('Session not available');
  } else {
    console.log('Session available:', req.sessionID);
    if (!req.session.visits) {
      req.session.visits = 1;
    } else {
      req.session.visits++;
    }
  }
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2>HI there!!</h2>');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
