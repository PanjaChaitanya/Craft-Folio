import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { getProjects } from '../api';


<Helmet>
  <title>Craft Folio - Portfolio CMS</title>
  <meta name="description" content="Manage and showcase your projects dynamically" />
</Helmet>

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Portfolio Projects</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img src={p.imageUrl} alt={p.title} className="h-48 w-full object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p>{p.description}</p>
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
          </div>
        ))}
      </div>
    </div>
  );
}
