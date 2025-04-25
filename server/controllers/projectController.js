// controllers/projectController.js
import Project from '../models/Project.js';

// @desc    Create a new project
// @route   POST /api/admin/projects
// @access  Private

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, imageUrl, liveUrl, githubUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newProject = new Project({ title, description, imageUrl, liveUrl, githubUrl });
    await newProject.save();

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ message: 'Server error' });
    res.status(500).json({ error: "Server error while creating project" });
  }
};
// PUT /projects/:id
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};
// DELETE /projects/:id
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

export default createProject;
