const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

module.exports = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    // Used by winston logger
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  email: {
    secret: process.env.EMAIL_SECRET_KEY,
    sender: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
};
