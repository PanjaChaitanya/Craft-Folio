import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  profileImage: String,
  socialLinks: [String],
});

export default mongoose.model('Profile', ProfileSchema);
