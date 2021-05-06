const { resolve } = require('path');

exports.default = {
  port: 3200,
  dateFormat: 'DD MMM YY, H:mm:ss',
  storageLimits: {
    userLoginHistory: 2
  },
  authentication: {
    userPasswordSalt: 8,
    expiresIn: 604800,
    jwtSecret: 'what-are-you-doing'
  },

  development: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: 'database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: 'database-test.sqlite'
  },
  production: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: 'database-prod.sqlite'
  }
};
