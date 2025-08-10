const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifySuperAdmin = require('../middleware/verifySuperAdmin');

// Dashboard Stats
router.get('/stats', verifySuperAdmin, async (req, res) => {
  try {
    const complaints = await pool.query('SELECT COUNT(*) FROM complaints');
    const inProcess = await pool.query(`SELECT COUNT(*) FROM complaints WHERE status = 'In Process'`);
    const resolved = await pool.query(`SELECT COUNT(*) FROM complaints WHERE status = 'Resolved'`);
    const departments = await pool.query('SELECT COUNT(*) FROM departments');
    const admins = await pool.query(`SELECT COUNT(*) FROM admins WHERE role = 'department_admin'`);
    const officers = await pool.query(`SELECT COUNT(*) FROM admins WHERE role = 'officer'`);

    res.json({
      totalComplaints: complaints.rows[0].count,
      inProcess: inProcess.rows[0].count,
      resolved: resolved.rows[0].count,
      totalDepartments: departments.rows[0].count,
      totalAdmins: admins.rows[0].count,
      totalOfficers: officers.rows[0].count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

module.exports = router;
