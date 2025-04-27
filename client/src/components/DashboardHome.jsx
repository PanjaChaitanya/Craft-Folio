// DashboardHome.jsx
import { Link } from 'react-router-dom';
import { FiFolder, FiAward } from 'react-icons/fi';

export default function DashboardHome() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500">Total Projects</h4>
          <p className="text-2xl font-bold mt-1 mb-2 text-gray-800">24</p>
          <p className="text-sm text-green-600">+3 this month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500">Skills</h4>
          <p className="text-2xl font-bold mt-1 mb-2 text-gray-800">15</p>
          <p className="text-sm text-green-600">+2 recently</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-sm font-medium text-gray-500">Active Users</h4>
          <p className="text-2xl font-bold mt-1 mb-2 text-gray-800">142</p>
          <p className="text-sm text-green-600">+12 today</p>
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
