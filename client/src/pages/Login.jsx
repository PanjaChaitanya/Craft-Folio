import { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mb-4 rounded" required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-4 rounded" required />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}
