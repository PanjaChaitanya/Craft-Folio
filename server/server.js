//server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import stats from './routes/stats.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/profile", profileRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/projects', projectRoutes);
app.use('/api/skills',skillRoutes);
app.use('/api/stats', stats)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
