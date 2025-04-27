import { useEffect, useState } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', icon: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getSkills().then((res) => setSkills(res.data));
  }, []);

  const handleCreate = async () => {
    const res = await createSkill(newSkill, token);
    setSkills([...skills, res.data]);
    setNewSkill({ name: '', icon: '' });
  };

  const handleUpdate = async (id) => {
    const res = await updateSkill(id, newSkill, token);
    setSkills(skills.map((s) => (s._id === id ? res.data : s)));
    setEditingId(null);
    setNewSkill({ name: '', icon: '' });
  };

  const handleDelete = async (id) => {
    await deleteSkill(id, token);
    setSkills(skills.filter((s) => s._id !== id));
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Manage Skills</h2>

      <div className="mb-6">
        <input
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          placeholder="Icon URL"
          value={newSkill.icon}
          onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
        />
        <button onClick={handleCreate} className="bg-green-600 text-white py-2 px-4 rounded">
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div key={s._id} className="border p-4 rounded shadow bg-white flex items-center gap-4">
            <img src={s.icon} alt={s.name} className="w-10 h-10" />
            {editingId === s._id ? (
              <>
                <input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="border p-1 rounded"
                />
                <input
                  value={newSkill.icon}
                  onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                  className="border p-1 rounded"
                />
                <button onClick={() => handleUpdate(s._id)} className="bg-blue-600 text-white px-2 py-1 rounded">Save</button>
                <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
              </>
            ) : (
              <>
                <span className="flex-1">{s.name}</span>
                <button onClick={() => { setEditingId(s._id); setNewSkill({ name: s.name, icon: s.icon }); }} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageSkills;