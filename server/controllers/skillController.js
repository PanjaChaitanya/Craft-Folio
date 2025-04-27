import Skill from "../models/Skill.js";

// Create
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: "Error creating skill", error });
  }
};

// Read all
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

// Update
export const updateSkill = async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Skill not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// Delete
export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
