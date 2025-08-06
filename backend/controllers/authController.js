const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('[Login] Incoming credentials:', email); // ✅ LOG

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) {
      console.log('[Login] User not found'); // ✅ LOG
      return res.status(400).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('[Login] Invalid password'); // ✅ LOG
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        department_id: user.department_id,
      },
      process.env.JWT_SECRET || 'cityconnect@123#',
      { expiresIn: '1d' }
    );

    console.log('[Login] Success for:', user.role); // ✅ LOG
    res.status(200).json({
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
      },
    });
  } catch (err) {
    console.error('[Login] Error:', err.message); // ✅ LOG
    res.status(500).json({ error: 'Internal server error' });
  }
};
