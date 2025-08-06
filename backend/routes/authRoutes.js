const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../middlewares/authMiddleware');
const { loginAdmin } = require('../controllers/authController');

// Public login route
router.post('/login', loginAdmin);

// Protected route (example)
router.get('/profile', verifyAdminToken, (req, res) => {
  res.json({ message: 'Access granted!', admin: req.admin });
});

module.exports = router;
