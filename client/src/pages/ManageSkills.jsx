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
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Skills</h2>

    {/* Add / Edit Skill Form */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Icon URL"
          value={newSkill.icon}
          onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <button
        onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
        className={`mt-4 px-5 py-2 rounded-lg text-white font-medium ${
          editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {editingId ? 'Save Changes' : 'Add Skill'}
      </button>
      {editingId && (
        <button
          onClick={() => {
            setEditingId(null);
            setNewSkill({ name: '', icon: '' });
          }}
          className="ml-3 mt-4 px-5 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
      )}
    </div>

    {/* Skills List */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((s) => (
        <div
          key={s._id}
          className="bg-white shadow-sm rounded-lg p-5 flex items-center gap-4 border border-gray-100 hover:shadow-md transition"
        >
          <img
            src={s.icon}
            alt={s.name}
            className="w-12 h-12 object-contain rounded-full border"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingId(s._id);
                setNewSkill({ name: s.name, icon: s.icon });
              }}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(s._id)}
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
export default ManageSkills;