import { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './maincss/style.css';

export default function MainNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="app-container" style={{ width: '100%', margin: 0, padding: 0 }}>
      <nav className="navbar">
        <div className="logo">🏦 OnlineBank</div>

        {/* Hamburger Menu for Mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>

          <li>
            <Link to="/customerregistration" onClick={() => setIsMenuOpen(false)}>
              Register
            </Link>
          </li>

          <li className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              Login 
              <KeyboardArrowDownIcon 
                className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} 
              />
            </button>

            <ul className="dropdown-menu">
              <li>
                <Link to="/customerlogin" onClick={() => setIsMenuOpen(false)}>
                  Customer
                </Link>
              </li>
              <li>
                <Link to="/stafflogin" onClick={() => setIsMenuOpen(false)}>
                  Staff
                </Link>
              </li>
              <li>
                <Link to="/adminlogin" onClick={() => setIsMenuOpen(false)}>
                  Admin
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
