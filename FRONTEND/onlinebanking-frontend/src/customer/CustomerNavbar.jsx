import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contextapi/AuthContext";
import axios from "axios";

import "./customercss/CustomerNavbar.css";

export default function CustomerNavBar() {
  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth();

  const [customer, setCustomer] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedCustomer = JSON.parse(sessionStorage.getItem("customer"));

    if (!storedCustomer) {
      navigate("/customerlogin", { replace: true });
      return;
    }

    setCustomer(storedCustomer);
    fetchUnreadCount(storedCustomer.id);

    const interval = setInterval(() => {
      fetchUnreadCount(storedCustomer.id);
    }, 30000);

    return () => clearInterval(interval);
  }, [navigate]);
  
  const fetchUnreadCount = async (customerId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/notification/customer/${customerId}/unread/count`
      );
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Error fetching unread count:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsCustomerLoggedIn(false);
    navigate("/customerlogin", { replace: true });
  };

  return (
    <>
      {/* 🔹 Top Navigation */}
      <nav className="customer-navbar">
        <div className="logo">OnlineBank</div>

        <div className="nav-links">
          <NavLink to="/customer/home">Home</NavLink>

          <NavLink to="/customer/deposit-withdraw">
            Deposit / Withdraw
          </NavLink>

          <NavLink to="/customer/statements">
            Statements
          </NavLink>

          <NavLink to="/customer/funds">
            Fund Transfer
          </NavLink>

          <NavLink to="/customer/loans">
            Loans
          </NavLink>

          <NavLink to="/customer/notifications">
            Notifications
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </NavLink>
        </div>

        <div className="navbar-right">
          {customer && (
            <span className="welcome-text">
              Welcome, {customer.fullName}
            </span>
          )}

          <NavLink to="/customer/profile" className="profile-icon-link">
            <FaUserCircle />
          </NavLink>

          <button className="logout-btn-icon" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>
    </>
  );
}
