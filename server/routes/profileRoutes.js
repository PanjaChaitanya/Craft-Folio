import express from 'express';
import multer from 'multer';
import Profile from '../models/Profile.js';

const router = express.Router();

// Setup multer (store in uploads/)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// CREATE profile
router.post('/', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, jobTitle, bio, socialLinks } = req.body;

    const profile = new Profile({
      name,
      jobTitle,
      bio,
      profileImage: req.files.profileImage ? req.files.profileImage[0].path : null,
      resume: req.files.resume ? req.files.resume[0].path : null,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : []
    });

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE profile
router.put('/:id', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, jobTitle, bio, socialLinks } = req.body;

    const updateData = {
      name,
      jobTitle,
      bio,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : []
    };

    if (req.files.profileImage) {
      updateData.profileImage = req.files.profileImage[0].path;
    }
    if (req.files.resume) {
      updateData.resume = req.files.resume[0].path;
    }

    const profile = await Profile.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE profile
router.delete('/:id', async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
