require("dotenv").config();

const configObj = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT,
};

module.exports = {
  development: configObj,
  test: configObj,
  production: configObj,
};
