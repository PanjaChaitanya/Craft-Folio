// Dashboard.jsx
import { useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { FiGrid, FiFolder, FiAward, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block relative overflow-hidden">
        <div className="p-6">
          <h1 className="text-xl font-bold text-indigo-700">Admin Portal</h1>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors border-l-4 ${
                isActive ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-transparent'
              }`
            }
          >
            <FiGrid size={18} className="mr-3" />
            Overview
          </NavLink>
          <NavLink
            to="manage-projects"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors border-l-4 ${
                isActive ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-transparent'
              }`
            }
          >
            <FiFolder size={18} className="mr-3" />
            Projects
          </NavLink>
          <NavLink
            to="manage-skills"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors border-l-4 ${
                isActive ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-transparent'
              }`
            }
          >
            <FiAward size={18} className="mr-3" />
            Skills
          </NavLink>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-700 font-medium">C</span>
            </div>
          </div>
        </header>

        <div className="p-6 overflow-y-auto">
          {/* This is where child pages render */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
