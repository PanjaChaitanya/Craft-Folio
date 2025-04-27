import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DashboardHome from './components/DashboardHome';
import ManageProjects from './pages/ManageProjects';
import ManageSkills from './pages/ManageSkills';

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<DashboardHome />} />
          <Route path="manage-projects" element={<ManageProjects />} />
          <Route path="manage-skills" element={<ManageSkills/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
