import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: String,
  jobTitle: String,
  bio: String,
  profileImage: String,
  resume: String,
  socialLinks: [String],
});

export default mongoose.model('Profile', ProfileSchema);
