require("dotenv").config();

module.exports = {
  db: {
    MONGO_URI: process.env.MONGO_URI,
  },
  general: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
  },
  auth: {
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  },
};
