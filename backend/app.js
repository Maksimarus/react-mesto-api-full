require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter');
const authRouter = require('./routes/authRouter');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const { NotFound } = require('./errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DB } = require('./env');

const options = {
  origin: [
    'http://localhost:3001',
    'http://mesto.maksimar.nomoredomains.club',
    'http://api.mesto.maksimar.nomoredomains.club',
    'https://mesto.maksimar.nomoredomains.club',
    'https://api.mesto.maksimar.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'credentials'],
  credentials: true,
};

const PORT = 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();
app.use('*', cors(options));

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', authRouter);

app.use(auth);
app.use('/cards', cardRouter);
app.use('/users', userRouter);
app.use('*', () => {
  throw new NotFound('Введен несуществующий путь');
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

try {
  mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
} catch (error) {
  console.log(`Не удалось запустить сервер из-за ошибки ${error}`);
}
