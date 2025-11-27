import { useState } from "react";
import axios from "axios";
import "./staffcss/StaffLogin.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contextapi/AuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}/staff`;

export default function StaffLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsStaffLoggedIn } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      if (res.status === 200) {
        // JWT login - store token and user info
        const { token, id, username, role } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
        localStorage.setItem("userRole", role);
        
        // Get full staff data
        try {
          const staffRes = await axios.get(`${API_URL}/profile/${id}`);
          sessionStorage.setItem("staff", JSON.stringify(staffRes.data));
        } catch (err) {
          sessionStorage.setItem("staff", JSON.stringify({ id, username }));
        }

        setIsStaffLoggedIn(true);
        setMessage("Login successful!");
        setError("");

        navigate("/dashboard");  
      }
    } catch (err) {
      setMessage("");
      if (err.response) setError(err.response.data);
      else setError("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-hero">
            <div className="bank-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h1>Staff Portal</h1>
            <p>Access the staff dashboard to manage customer services, process transactions, and handle loan approvals efficiently.</p>
            <div className="security-features">
              <div className="security-item">
                <i className="fas fa-users-cog"></i>
                <span>Customer Management</span>
              </div>
              <div className="security-item">
                <i className="fas fa-exchange-alt"></i>
                <span>Transaction Processing</span>
              </div>
              <div className="security-item">
                <i className="fas fa-file-invoice-dollar"></i>
                <span>Loan Approvals</span>
              </div>
            </div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <div className="form-header">
              <h2>Staff Sign In</h2>
              <p>Enter your credentials to access the staff dashboard</p>
            </div>

            {message && (
              <div className="alert-message success">
                <i className="fas fa-check-circle"></i>
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="alert-message error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fas fa-user"></i> Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i> Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="signin-button">
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </button>
            </form>

            <p className="signup-link">
              Not a Staff member? <Link to="/">Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
