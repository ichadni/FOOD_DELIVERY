const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Jwt_SECRET = 'your_jwt_secret_key';

// ====================== CREATE USER ======================
router.post(
  '/createuser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('role').isIn(['user', 'admin'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      // Save user to DB
      const user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
        role: req.body.role
      });

      // Create JWT token
      const data = {
        user: {
          id: user.id,
          role: user.role
        }
      };
      const authToken = jwt.sign(data, Jwt_SECRET);

      // Send response
      res.json({
        success: true,
        authToken: authToken,
        role: user.role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
);

// ====================== LOGIN USER ======================
router.post(
  '/loginuser',
  [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }

    const { email, password } = req.body;

    try {
      // Find user
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: 'Try login with correct email', success: false });
      }

      // Compare password
      const pwdCompare = await bcrypt.compare(password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: 'Try login with correct password', success: false });
      }

      // Create JWT token
      const data = {
        user: {
          id: userData.id,
          role: userData.role
        }
      };
      const authToken = jwt.sign(data, Jwt_SECRET);

      // Send response
      res.json({
        success: true,
        authToken: authToken,
        role: userData.role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
