const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, c.title, c.description, c.status, c.created_at, u.username AS reported_by
      FROM complaints c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE complaints SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete complaint
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM complaints WHERE id=$1', [req.params.id]);
    res.json({ message: 'Complaint deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
