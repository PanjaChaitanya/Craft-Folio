//pages/ManageProjects.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject } from '../api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({});
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
    const res = await createProject(newProject, token);
    setProjects([...projects, res.data.project]);
    setNewProject({ title: '', description: '', imageUrl: '', liveUrl: '', githubUrl: '' });
  } catch (err) {
    alert('Error saving project');
  }
};

const handleDelete = async (id) => {
  try {
    await deleteProject(id, token);
    setProjects(projects.filter((p) => p._id !== id));
  } catch (err) {
    alert('Error deleting project');
  }
};


  return (
    <div className="p-8">
      <h2 className="text-xl text-center font-bold mb-4">Manage Projects</h2>
      <div className="mb-6">
        <input
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
        />
        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
        />
        <input
          placeholder="Image URL"
          value={newProject.imageUrl}
          onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
        />
        <input
          placeholder="Live Link"
          value={newProject.liveUrl}
          onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
        />
        <button onClick={handleCreate} className="bg-green-600 text-white py-2 px-4 rounded">
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((p) => (
        <div key={p._id} className=" p-4 rounded shadow bg-white">
          {editingProject === p._id ? (
            <div className=''>
              <div>
                <b>Title: </b>
                <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
              </div>
              <div>
                <b>Live Url :</b>
                <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" value={editForm.liveUrl} onChange={(e) => setEditForm({...editForm,liveUrl: e.target.value})} />
              </div>
              <div>
                <b>Image Link :</b>
                <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" value={editForm.imageUrl} onChange={(e) => setEditForm({...editForm,imageUrl: e.target.value})} />
              </div>
               <div>
                <b>Description: </b>
                <textarea className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
              </div>
              <div className="buttons flex justify-around">
                 <button
                 className='bg-green-400 px-3 py-1 rounded'
                onClick={async () => {
                  const res = await updateProject(p._id, editForm, token);
                  setProjects(projects.map((proj) => (proj._id === p._id ? res.data : proj)));
                  setEditingProject(null);
                }}
              >
                Save
              </button>
              <button className='bg-red-500 px-3 py-1 rounded' onClick={() => setEditingProject(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3><b>Title :</b> {p.title}</h3>
              <img src={p.imageUrl} alt={p.title} className="h-48 w-full object-cover rounded mb-2" />
              <p><b>Description :</b> {p.description}</p>
              <p><b>Live Url :</b> {p.liveUrl}</p>
              <p><b>Github :</b> {p.githubUrl}</p>
              <div className=' update-buttons flex flex-wrap justify-around'>
                <button className='bg-amber-500 px-3 py-1 rounded' onClick={() => { setEditingProject(p._id); setEditForm(p); }}>Edit</button>
                <button className='bg-red-600 px-3 py-1 rounded' onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
export default ManageProjects;