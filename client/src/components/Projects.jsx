import { useEffect, useState } from 'react';
import { getProjects } from '../api';


export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);

  return (
    <div className="flex-col items-center mt-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl text-center font-bold mb-6"> PROJECTS </h1>

        {projects.map((p) => (
          <div key={p._id} className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 max-h-screen py-4 mt-10 shadow rounded">
            {/* Project Left Details */}
				    <div className="flex-1 text-left space-y-6 ml-0 sm:ml-16">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className='text-lg text-gray-800 max-w-[500px]'>{p.description}</p>
              <button class="group inline-flex h-9 items-center justify-center rounded bg-neutral-950 px-6 font-medium text-neutral-200"><a href={p.liveUrl} target="_blank" >Live</a><div class="relative ml-1 h-5 w-5 overflow-hidden"><div class="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></div></button>
            </div>
              {/* Project Right Details */}
              <div className='w-[280px] sm:w-[300px] md:mt-20 lg:mt-0 md:w-[350px] lg:w-[450px]'>
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover rounded mb-2 shadow" />
              </div>
            </div>
          
        ))}
      
    </div>
  );
}