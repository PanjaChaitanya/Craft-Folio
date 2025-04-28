import {useEffect, useState} from 'react'
import { getSkills } from '../api'

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getSkills().then(res => setSkills(res.data));
    }, []);

  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-5">Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {skills.map((s) => (
          <div key={s._id} className="flex flex-col items-center">
            <img src={s.icon} alt={s.name} className="w-12 h-12 mb-2" />
            <span className="text-lg uppercase font-semibold">{s.name}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Skills