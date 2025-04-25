import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav className="flex flex-col gap-2">
        <Link to="/manage-projects" className="text-blue-600 underline">
          Manage Projects
        </Link>
        {/* Add links to Manage Skills or Profile later */}
      </nav>
    </div>
  );
}
