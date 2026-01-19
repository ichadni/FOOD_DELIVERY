const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Jwt_SECRET = 'your_jwt_secret_key';

// CREATE USER
router.post(
  '/createuser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    const secpassword=await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
);

// LOGIN USER
router.post(
  '/loginuser',
  [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: 'try login with correct email' });
      }
      const pwdCompare=await bcrypt.compare(password,userData.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: 'try login with correct password' });
      }
      const data={
        user: {
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,Jwt_SECRET);

      res.json({ success: true, authToken: authToken });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
