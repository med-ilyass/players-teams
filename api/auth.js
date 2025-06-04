import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByUsername } from '../db/queries/users.js';

dotenv.config();
const router = express.Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await getUserByUsername(username);
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username } });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
});

export default router;