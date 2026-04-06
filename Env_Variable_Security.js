// config.js - Secure configuration management
require('dotenv').config();

const config = {
  development: {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // Never hardcode!
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h'
    },
    api: {
      key: process.env.API_KEY,
      baseUrl: process.env.API_BASE_URL
    }
  },
  production: {
    // Production-specific config
    database: {
      host: process.env.PROD_DB_HOST,
      // ... other production settings
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];