import express from 'express'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'

const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const projectCount = await Project.countDocuments()
        const skillCount = await Skill.countDocuments()

        res.json({
            projects : projectCount,
            skills : skillCount
        })
    }catch(err){
        res.status(500).json({ message : "Error fetching Details"});
    }
});

export default router;