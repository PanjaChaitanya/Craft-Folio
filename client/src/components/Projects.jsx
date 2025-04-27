import { useEffect, useState } from 'react';
import { getProjects } from '../api';


export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl text-center font-bold mb-6"> Projects </h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img src={p.imageUrl} alt={p.title} className="h-48 w-full object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p>{p.description}</p>
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden 
            text-sm font-medium text-black rounded-lg group 
            bg-gradient-to-br from-green-400 to-blue-600
            hover:text-white group-hover:from-green-400 group-hover:to-blue-600 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
            shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80">
              <span class="relative px-4 py-1.5 transition-all ease-in duration-75 
           bg-white dark:bg-gray-900 rounded-md 
           group-hover:bg-transparent group-hover:dark:bg-transparent">
              Live 
            </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}