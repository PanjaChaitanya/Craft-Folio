import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useState} from 'react'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky  top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Craft Folio</span>
        </Link>
        {token && <Link to="/dashboard" className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-gray-950 px-6 font-medium text-neutral-200"><span>Dashboard</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></Link>}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
            dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Menu */}
        <div className={`${menuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 
            md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white 
            dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            {isHomePage && (
             <>
              <li>
                <a
                  href="#"
                  className="group relative block h-10 overflow-hidden rounded-sm px-4 py-2 text-gray-900 dark:text-white hover:text-white"
                >
                  <span className="relative z-10">Home</span>
                  <span className="absolute inset-0 overflow-hidden rounded-sm">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-black transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="group relative block h-10 overflow-hidden rounded-sm px-4 py-2 text-gray-900 dark:text-white hover:text-white"
                >
                  <span className="relative z-10">Projects</span>
                  <span className="absolute inset-0 overflow-hidden rounded-sm">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-black transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="group relative block h-10 overflow-hidden rounded-sm px-4 py-2 text-gray-900 dark:text-white hover:text-white"
                >
                  <span className="relative z-10">Skills</span>
                  <span className="absolute inset-0 overflow-hidden rounded-sm">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-black transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group relative block h-10 overflow-hidden rounded-sm px-4 py-2 text-gray-900 dark:text-white hover:text-white"
                >
                  <span className="relative z-10">Services</span>
                  <span className="absolute inset-0 overflow-hidden rounded-sm">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-black transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group relative block h-10 overflow-hidden rounded-sm px-4 py-2 text-gray-900 dark:text-white hover:text-white"
                >
                  <span className="relative z-10">Contact</span>
                  <span className="absolute inset-0 overflow-hidden rounded-sm">
                    <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-black transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                  </span>
                </a>
              </li>
            </>
            )}
            <li className="login-logout">
              {token ? (
                <button onClick={logout} className="text-red-400 cursor-pointer">Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;