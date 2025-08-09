const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');
const verifyAdminToken = require('../middlewares/verifyAdminToken'); // ✅ FIXED path

// Public route
router.post('/login', loginAdmin);

// Protected route
router.get('/profile', verifyAdminToken, (req, res) => {
  res.json({ message: 'Access granted!', admin: req.admin });
});

module.exports = router;
