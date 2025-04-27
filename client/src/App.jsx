import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import Navbar from './components/Navbar';
import ManageSkills from './pages/ManageSkills';

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-projects" element={<ManageProjects />} />
        <Route path="/manage-skills" element={<ManageSkills/>}></Route>
      </Routes>
    </Router>
  );
}
