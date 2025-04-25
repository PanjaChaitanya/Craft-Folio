//routes/admin.js
import express from 'express';
import verifyToken from '../middleware/auth.js';
import Project from '../models/Project.js';
import createProject from '../controllers/projectController.js';
import Skill from '../models/Skill.js';
import Profile from '../models/Profile.js';

const router = express.Router();

// Project CRUD
router.post('/project', verifyToken, createProject);

router.get('/project', async (req, res) => res.json(await Project.find()));
router.put('/project/:id', verifyToken, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/project/:id', verifyToken, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

// Repeat similar CRUD for Skill and Profile
export default router;

