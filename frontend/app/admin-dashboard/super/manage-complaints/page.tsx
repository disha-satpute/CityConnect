// backend/routes/complaints.js
const express = require("express");
const pool = require("../config/db"); // PostgreSQL connection

const router = express.Router();

/**
 * GET all complaints
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, d.name AS department_name
       FROM complaints c
       LEFT JOIN departments d ON c.department_id = d.id
       ORDER BY c.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET complaint by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, d.name AS department_name
       FROM complaints c
       LEFT JOIN departments d ON c.department_id = d.id
       WHERE c.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching complaint:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * CREATE a new complaint
 */
router.post("/", async (req, res) => {
  const { title, description, department_id, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO complaints (title, description, department_id, status, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [title, description, department_id || null, status || "pending"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating complaint:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * UPDATE a complaint
 */
router.put("/:id", async (req, res) => {
  const { title, description, department_id, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE complaints
       SET title = $1, description = $2, department_id = $3, status = $4
       WHERE id = $5 RETURNING *`,
      [title, description, department_id || null, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE a complaint
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM complaints WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted" });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
