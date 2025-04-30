import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfiles, createProfile, updateProfile, deleteProfile } from '../api';

const ManageProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newProfile, setNewProfile] = useState({
    name: '',
    jobTitle: '',
    bio: '',
    socialLinks: '',
    profileImage: null,
    resume: null,
  });

  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  useEffect(() => {
    getProfiles().then((res) => setProfiles(res.data));
  }, []);

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProfile.name);
      formData.append('jobTitle', newProfile.jobTitle);
      formData.append('bio', newProfile.bio);
      formData.append('socialLinks', JSON.stringify(newProfile.socialLinks.split(',')));
      if (newProfile.profileImage) formData.append('profileImage', newProfile.profileImage);
      if (newProfile.resume) formData.append('resume', newProfile.resume);

      const res = await createProfile(formData, token);
      setProfiles([...profiles, res.data]);
      setNewProfile({ name: '', jobTitle: '', bio: '', socialLinks: '', profileImage: null, resume: null });
    } catch (err) {
      alert('Error creating profile');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfile(id, token);
      setProfiles(profiles.filter((p) => p._id !== id));
    } catch (err) {
      alert('Error deleting profile');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl text-center font-bold mb-4">Manage Profile</h2>

      {/* Create Form */}
      <div className="mb-6">
        <input
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <input
          placeholder="Job Title"
          value={newProfile.jobTitle}
          onChange={(e) => setNewProfile({ ...newProfile, jobTitle: e.target.value })}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <textarea
          placeholder="Bio"
          value={newProfile.bio}
          onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <input
          placeholder="Social Links (comma separated)"
          value={newProfile.socialLinks}
          onChange={(e) => setNewProfile({ ...newProfile, socialLinks: e.target.value })}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <div className="flex gap-2">
          <span className="font-bold">Upload Image </span>
          <input
            type="file"
            onChange={(e) => setNewProfile({ ...newProfile, profileImage: e.target.files[0] })}
            className="mb-2 bg-gray-400 border rounded"
          />
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Upload Resume </span>
          <input
            type="file"
            onChange={(e) => setNewProfile({ ...newProfile, resume: e.target.files[0] })}
            className="mb-2 bg-gray-400 border rounded"
          />
        </div>
        <button onClick={handleCreate} className="bg-green-600 text-white py-2 px-4 rounded">
          Add Profile
        </button>
      </div>

      {/* List Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((p) => (
          <div key={p._id} className="p-4 rounded shadow bg-white">
            {editingProfile === p._id ? (
              <div>
                <input
                  placeholder="Name"
                  className="w-full border px-3 py-2 mb-2 rounded"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <input
                  placeholder="Job Title"
                  className="w-full border px-3 py-2 mb-2 rounded"
                  value={editForm.jobTitle}
                  onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                />
                <textarea
                  placeholder="Bio"
                  className="w-full border px-3 py-2 mb-2 rounded"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                />
                <input
                  placeholder="Social Links (comma separated)"
                  className="w-full border px-3 py-2 mb-2 rounded"
                  value={editForm.socialLinks.join(', ')}
                  onChange={(e) =>
                    setEditForm({ ...editForm, socialLinks: e.target.value.split(',') })
                  }
                />
                <div className="flex gap-2">
                  <span className="font-bold">Change Image </span>
                  <input
                    type="file"
                    onChange={(e) => setEditForm({ ...editForm, profileImage: e.target.files[0] })}
                    className="mb-2 bg-gray-400 border rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">Change Resume </span>
                  <input
                    type="file"
                    onChange={(e) => setEditForm({ ...editForm, resume: e.target.files[0] })}
                    className="mb-2 bg-gray-400 border rounded"
                  />
                </div>

                <button
                  className="bg-green-500 px-3 py-1 rounded text-white"
                  onClick={async () => {
                    const formData = new FormData();
                    formData.append('name', editForm.name);
                    formData.append('jobTitle', editForm.jobTitle);
                    formData.append('bio', editForm.bio);
                    formData.append('socialLinks', JSON.stringify(editForm.socialLinks));
                    if (editForm.profileImage instanceof File)
                      formData.append('profileImage', editForm.profileImage);
                    if (editForm.resume instanceof File) formData.append('resume', editForm.resume);

                    const res = await updateProfile(p._id, formData, token);
                    setProfiles(profiles.map((prof) => (prof._id === p._id ? res.data : prof)));
                    setEditingProfile(null);
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded text-white"
                  onClick={() => setEditingProfile(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h3><b>Name:</b> {p.name}</h3>
                <p><b>Job Title:</b> {p.jobTitle}</p>
                <p><b>Bio:</b> {p.bio}</p>
                <p><b>Social Links:</b> {p.socialLinks.join(', ')}</p>
                {p.profileImage && (
                  <img
                    src={`http://localhost:5000/${p.profileImage}`}
                    alt="Profile"
                    className="h-32 w-32 object-cover rounded-full"
                  />
                )}
                {p.resume && (
                  <a
                    href={`http://localhost:5000/${p.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-amber-500 px-3 py-1 rounded"
                    onClick={() => {
                      setEditingProfile(p._id);
                      setEditForm({
                        ...p,
                        socialLinks: Array.isArray(p.socialLinks)
                          ? p.socialLinks
                          : p.socialLinks.split(','),
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white"
                    onClick={() => handleDelete(p._id)}
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
};

export default ManageProfile;
