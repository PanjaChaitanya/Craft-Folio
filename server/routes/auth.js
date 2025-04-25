import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import router from './admin.js';



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(404).json({ msg: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.get('/create-admin', async (req, res) => {
  const existing = await Admin.findOne({ email: 'admin@craftfolio.com' });

  if (existing) return res.send('Admin already exists');

  const hashed = await bcrypt.hash('admin123', 10);

  await Admin.create({
    email: 'admin@craftfolio.com',
    password: hashed,
  });

  res.send('Admin created');
});

export default router;

