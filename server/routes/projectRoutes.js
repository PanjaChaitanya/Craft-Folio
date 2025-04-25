//routes/projectRoutes.js
import express from 'express';
const router = express.Router();
import {getProjects, createProject, updateProject, deleteProject} from '../controllers/projectController.js';
import protect from '../middleware/auth.js';

router.post('/', protect, createProject);
router.get('/', getProjects);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);


export default router;
