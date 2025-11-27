import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "../admin/admincss/AdminNavbar.css";
import { useAuth } from "../contextapi/AuthContext.jsx";

export default function StaffNavBar() {
  const navigate = useNavigate();
  const { setIsStaffLoggedIn } = useAuth();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsStaffLoggedIn(false);
    navigate("/stafflogin", { replace: true });
  };

  return (
    <>
      {/* 🔹 Top Navbar */}
      <nav className="admin-navbar">
        <div className="logo">Staff Portal</div>

        <div className="nav-links">
          <NavLink to="/staff/dashboard" end>
            Dashboard
          </NavLink>

          <NavLink to="/staff/transactions">
            Transactions
          </NavLink>

          <NavLink to="/staff/staffloans">
            Loan Approvals
          </NavLink>

          <NavLink to="/staff/customers">
            Customers
          </NavLink>

          <NavLink to="/staff/profile">
            <FaUserCircle className="navbar-icon" />
          </NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>
    </>
  );
}
