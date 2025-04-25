import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: String,
  icon: String,
});

export default mongoose.model('Skill', SkillSchema);
