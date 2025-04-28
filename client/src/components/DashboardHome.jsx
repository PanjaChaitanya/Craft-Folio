// DashboardHome.jsx
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiAward } from 'react-icons/fi';
import { getStats } from '../api';
import CountUp from './CountUp';
export default function DashboardHome() {
    
    const [stats, setStats] = useState({projects : 0, skills : 0})

    useEffect(() => {
        const token = localStorage.getItem("token");
        getStats(token).then(res=>setStats(res.data)).catch(err => console.error(err))
    }, [])
    
    return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500">Total Projects</h4>
          <CountUp
            from={0}
            to={stats.projects}
            separator=","
            direction="up"
            duration={1}
            className="text-2xl font-bold mt-1 mb-2 text-gray-800"
            />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500">Skills</h4>
          <CountUp
            from={0}
            to={stats.skills}
            separator=","
            direction="up"
            duration={1}
            className="text-2xl font-bold mt-1 mb-2 text-gray-800"
            />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="manage-projects"
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-100 transition-colors"
          >
            <FiFolder size={20} className="text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Manage Projects</span>
          </Link>
          <Link
            to="manage-skills"
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-100 transition-colors"
          >
            <FiAward size={20} className="text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Manage Skills</span>
          </Link>
        </div>
      </div>
    </>
  );
}
