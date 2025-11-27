import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

import MainNavBar from "./main/MainNavbar";
import AdminNavbar from "./admin/AdminNavbar";
import CustomerNavbar from "./customer/CustomerNavbar";
import StaffNavbar from "./staff/StaffNavbar";

// MAIN PAGES
import Home from "./main/Home";
import About from "./main/About";
import Contact from "./main/Contact";

// AUTH PAGES
import AdminLogin from "./admin/AdminLogin";
import CustomerLogin from "./customer/CustomerLogin";
import CustomerRegistration from "./customer/CustomerRegistration";
import StaffLogin from "./staff/StaffLogin";

// ADMIN PAGES
import AdminDashboard from "./admin/AdminDashboard";
import AddStaff from "./admin/AddStaff";
import ManageCustomers from "./admin/ManageCustomers";
import ManageStaff from "./admin/ManageStaff";
import Reports from "./admin/Reports";
import AllTransactions from "./admin/AllTransactions";

// CUSTOMER PAGES
import CustomerHome from "./customer/CustomerHome";
import DepositWithdraw from "./customer/DepositWithdraw";
import Statements from "./customer/Statements";
import Transferfunds from "./customer/Transferfunds";
import CustomerProfile from "./customer/CustomerProfile";
import Loans from "./customer/Loans";
import Notifications from "./customer/Notifications";
import CustomerUpdateProfile from "./customer/UpdateProfile";

// STAFF PAGES
import StaffDashboard from "./staff/StaffDashboard";
import StaffProfile from "./staff/StaffProfile";
import LoanApproval from "./staff/LoanApproval";
import ViewAllCustomers from "./staff/ViewAllCustomers";
import Transactions from "./staff/Transcations";

import NotFound from "./main/NotFound";

function Layout() {
  const { isAdminLoggedIn, isCustomerLoggedIn, isStaffLoggedIn } = useAuth();

  return (
    <>
      {isAdminLoggedIn ? (
        <AdminNavbar />
      ) : isCustomerLoggedIn ? (
        <CustomerNavbar />
      ) : isStaffLoggedIn ? (
        <StaffNavbar />
      ) : (
        <MainNavBar />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />

        <Routes>
          {/* MAIN ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* AUTH ROUTES */}
          <Route path="/customerlogin" element={<CustomerLogin />} />
          <Route path="/customerregistration" element={<CustomerRegistration />} />
          <Route path="/stafflogin" element={<StaffLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* ──────────────── ADMIN ROUTES ──────────────── */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addstaff" element={<AddStaff />} />
          <Route path="/admin/managestaff" element={<ManageStaff />} />
          <Route path="/admin/managecustomers" element={<ManageCustomers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/transactions" element={<AllTransactions />} />

          {/* ──────────────── CUSTOMER ROUTES ──────────────── */}
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/deposit-withdraw" element={<DepositWithdraw />} />
          <Route path="/customer/statements" element={<Statements />} />
          <Route path="/customer/funds" element={<Transferfunds />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/loans" element={<Loans />} />
          <Route path="/customer/notifications" element={<Notifications />} />
          <Route path="/customer/update" element={<CustomerUpdateProfile />} />

          {/* ──────────────── STAFF ROUTES ──────────────── */}
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/profile" element={<StaffProfile />} />
          <Route path="/staff/staffloans" element={<LoanApproval />} />
          <Route path="/staff/transactions" element={<Transactions />} />
          <Route path="/staff/customers" element={<ViewAllCustomers />} />

          {/* 404 PAGE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
