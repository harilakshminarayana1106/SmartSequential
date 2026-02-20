require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

/* =============================
   CORS CONFIG (IMPORTANT)
============================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://smartsequential-mfls4xg9t-harilakshminarayana1106s-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

/* =============================
   ROOT ROUTE (Fixes Cannot GET /)
============================= */
app.get("/", (req, res) => {
  res.json({
    message: "Smart Sequential Backend Running 🚀",
    status: "OK"
  });
});

/* =============================
   HEALTH CHECK
============================= */
app.get("/health", (req, res) => {
  res.json({ status: "Server Healthy ✅" });
});

/* =============================
   GET ENGINEERS
============================= */
app.get("/engineers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM engineers ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET ENGINEERS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =============================
   CREATE CALL + SMART ROUND ROBIN
============================= */
app.post("/create-call", async (req, res) => {
  try {
    const data = req.body;

    const specialization = data.specialization?.toLowerCase()?.trim();

    const quantity = Number(data.quantity) || 1;
    let weight = 1;

    const problemText = (data.problem || "").toLowerCase();

    if (problemText.includes("refill")) weight = 0.2;
    else if (problemText.includes("installation")) weight = 5;
    else if (problemText.includes("service")) weight = 3;

    const workload = weight * quantity;

    const eng = await pool.query(
      `SELECT *
       FROM engineers
       WHERE LOWER(TRIM(specialization))=$1
       ORDER BY COALESCE(workload,0) ASC, id ASC
       LIMIT 1`,
      [specialization]
    );

    let engineer_id = null;

    if (eng.rows.length > 0) {
      engineer_id = eng.rows[0].id;

      await pool.query(
        `UPDATE engineers
         SET status='busy',
             workload = COALESCE(workload,0) + $1,
             updated_at=NOW()
         WHERE id=$2`,
        [workload, engineer_id]
      );
    }

    const result = await pool.query(
      `INSERT INTO calls(
        call_id,
        customer_name,
        mobile,
        address,
        product_name,
        product_type,
        main_category,
        sub_category,
        component_type,
        make,
        capacity,
        quantity,
        serial_number,
        problem,
        call_type,
        lat,
        lng,
        specialization,
        engineer_id,
        status,
        created_at,
        updated_at
      )
      VALUES(
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17,$18,$19,'open',
        NOW(),NOW()
      )
      RETURNING *`,
      [
        data.call_id,
        data.customer_name,
        data.mobile,
        data.address,
        data.product_name,
        data.product_type,
        data.main_category,
        data.sub_category,
        data.component_type,
        data.make,
        data.capacity,
        workload,
        data.serial_number,
        data.problem,
        data.call_type,
        data.lat || 0,
        data.lng || 0,
        specialization,
        engineer_id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("CREATE CALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =============================
   GET CALLS WITH ENGINEER NAME
============================= */
app.get("/calls/:status", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT calls.*, engineers.name AS engineer_name
       FROM calls
       LEFT JOIN engineers
       ON calls.engineer_id = engineers.id
       WHERE calls.status=$1
       ORDER BY calls.id DESC`,
      [req.params.status]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("GET CALLS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =============================
   COMPLETE CALL
============================= */
app.post("/complete-call/:id", async (req, res) => {
  try {
    await pool.query(
      `UPDATE calls
       SET status='completed',
           completed_at=NOW(),
           updated_at=NOW()
       WHERE id=$1`,
      [req.params.id]
    );

    res.json({ message: "Call Completed" });

  } catch (err) {
    console.error("COMPLETE CALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =============================
   CANCEL CALL
============================= */
app.post("/cancel-call/:id", async (req, res) => {
  try {
    await pool.query(
      `UPDATE calls
       SET status='cancelled',
           cancelled_at=NOW(),
           updated_at=NOW()
       WHERE id=$1`,
      [req.params.id]
    );

    res.json({ message: "Call Cancelled" });

  } catch (err) {
    console.error("CANCEL CALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =============================
   START SERVER
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});