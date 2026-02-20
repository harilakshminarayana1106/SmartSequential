require("dotenv").config();
const { Pool } = require("pg");

/* =============================
   CHECK DATABASE URL
============================= */
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing in environment variables");
  process.exit(1);
}

/* =============================
   CREATE POOL CONNECTION
============================= */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* =============================
   TEST DB CONNECTION
============================= */
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL Connected (Neon DB)");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database Connection Error:", err.message);
  });

module.exports = pool;