require("dotenv").config();

const { Pool } = require("pg");   // ✅ IMPORTANT IMPORT

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;