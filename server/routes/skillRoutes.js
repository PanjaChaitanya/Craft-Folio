import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/',protect, createSkill);
router.get('/', getSkills);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;