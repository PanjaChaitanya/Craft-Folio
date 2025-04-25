import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">Craft Folio</Link>
        {token && <Link to="/dashboard" className="mr-4">Dashboard</Link>}
      </div>
      <div>
        {token
          ? <button onClick={logout} className="text-red-400 cursor-pointer">Logout</button>
          : <Link to="/login">Login</Link>
        }
      </div>
    </nav>
  );
}
