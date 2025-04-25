//pages/ManageProjects.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject } from '../api';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
  title: '',
  description: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: ''
});

  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);
  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  const handleCreate = async () => {
    try {
      if (newProject._id) {
        // Update existing project
        const res = await axios.put(
          `http://localhost:5000/api/projects/${newProject._id}`,
          newProject,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(projects.map(p => p._id === newProject._id ? res.data.project : p));
      } else {
        // Create new project
        const res = await createProject(newProject, token);
        setProjects([...projects, res.data.project]);
      }

      setNewProject({
        title: '',
        description: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: ''
      });
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleEdit = (project) => {
    setNewProject(project); // This fills the form with existing data
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Manage Projects</h2>

      <div className="mb-6">
        <input
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          placeholder="Image URL"
          value={newProject.imageUrl}
          onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          placeholder="Link"
          value={newProject.liveUrl}
          onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        />
        <button onClick={handleCreate} className="bg-green-600 text-white py-2 px-4 rounded">
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {projects.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow bg-white">
            {editingProject === p._id ? (
              <>
                <input
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="border p-2 mb-1 w-full rounded"
                />
                <input
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="border p-2 mb-1 w-full rounded"
                />
                <input
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="border p-2 mb-1 w-full rounded"
                />
                <input
                  value={newProject.link}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  className="border p-2 mb-1 w-full rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      const res = await updateProject(p._id, newProject, token);
                      setProjects(projects.map((proj) => (proj._id === p._id ? res.data : proj)));
                      setEditingProject(null);
                      setNewProject({ title: '', description: '', image: '', link: '' });
                    }}
                    className="bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="bg-gray-400 text-white py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p>{p.description}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Visit</a>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditingProject(p._id);
                      setNewProject({ title: p.title, description: p.description, image: p.image, link: p.link });
                    }}
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      await deleteProject(p._id, token);
                      setProjects(projects.filter((proj) => proj._id !== p._id));
                    }}
                    className="bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}


      </div>
    </div>
  );
}
