import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard"; // User dashboard
import AdminDashboard from "./Pages/AdminDashboard"; // Admin Dashboard
import VendorRegistration from "./Pages/VendorRegistration";
import EditProfile from "./Pages/EditProfile";
import UserActivity from "./Pages/UserActivity"; // User Activity page (for user sessions)
import Users from "./Pages/Users"; // Admin Users Management
import UserDetails from "./Pages/UserDetails"; // User Details page (to view user and delete)
import ViewActivity from "./Pages/ViewActivity"; // Correcting the path for ViewActivity (Profile)
import AddUser from "./Pages/AddUser";

import Budget from "./Pages/Budget";
import Recurring from "./Pages/Recurring";
import NonRecurring from "./Pages/NonRecurring";
import AddProduct from "./Pages/AddProduct";
import NonAddProduct from "./Pages/NonAddProduct";
import UpdateBudget from "./Pages/UpdateBudget";
import NonUpdateBudget from "./Pages/NonUpdateBudget";
import ViewReports from './Pages/ViewReports';
import Expenditure from './Pages/Expenditure';
import Report from "./Pages/Report";

import Procurement from "./Pages/Procurement";
import Trends from "./Pages/Trends";
import Reports from "./Pages/Reports";
import SubReports from "./Pages/SubReports";

// Procurement Module
import ProcurementDashboard from "./Pages/ProcurementModule/ProcurementDashboard";
import ProcurementRequests from "./Pages/ProcurementModule/ProcurementRequests";
import NewRequest from "./Pages/ProcurementModule/NewRequest";

import CompilanceAudit from './Pages/CompilanceAudit';
import Audit from './Pages/Audit';
import AuditPolicies from './Pages/AuditPolicies';
import AuditProcurement from './Pages/AuditProcurement';
import AuditReports from './Pages/AuditReports';

import Notifications from './Pages/Notifications';
import NotificationsProcurement from './Pages/NotificationsProcurement';
import Alerts from './Pages/Alerts';
import ChatBox from './Pages/ChatBox';

import Inventory from './Pages/Inventory';
import InventoryDashboard from './Pages/InventoryDashboard';
import InventoryPage from './Pages/InventoryPage';
import InventoryReports from './Pages/InventoryReports';
import StockLevels from './Pages/StockLevels';
import ItemEntry from './Pages/ItemEntry';

import Navbar from "./Components/Navbar/Navbar";
import TopNavbar1 from "./Components/Navbar/TopNavbar";
import Navbar1 from "./Components/Navbar/Navbar1"; // User sidebar
import Navbar2 from "./Components/Navbar/Navbar2"; // Admin sidebar


import { AppProvider } from './Context/AppContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track role from storage

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    const storedRole = localStorage.getItem("role"); // Get role from localStorage
    if (storedRole) setUserRole(storedRole);

    if (sessionId) {
      fetch("http://localhost:5000/api/users/validate-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  return (
    <AppProvider>
    <Router>
      <div className="App">
        <Navbar />

        {isAuthenticated && (
          <>
            <TopNavbar1 setIsAuthenticated={setIsAuthenticated} />
            <div className="dash">
              {userRole === "Admin" ? <Navbar2 /> : <Navbar1 />}
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    userRole === "Admin" ? <AdminDashboard /> : <Dashboard />
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/view-activity" element={<ViewActivity />} /> {/* For Profile page */}

                {/* Procurement Module Routes for Regular Users */}
                <Route path="/procurement" element={<ProcurementDashboard />} />
                <Route path="/procurement/requests" element={<ProcurementRequests />} />
                <Route path="/procurement/new-request" element={<NewRequest />} />
                {userRole === "Admin" && (
                  <>
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/user-details/:userId" element={<UserDetails />} /> {/* For UserDetails */}
                    <Route path="/user-activity/:userId" element={<UserActivity />} />
                    <Route path="/add-user" element={<AddUser />} />


                    {/* Budgets Module (Admin Only) */}
                    <Route path="/admin/budget" element={<Budget />} />
                    <Route path="/admin/budget/recurring" element={<Recurring />} />
                    <Route path="/admin/budget/non-recurring" element={<NonRecurring />} />
                    <Route path="/admin/budget/add-product" element={<AddProduct />} />
                    <Route path="/admin/budget/non-add-product" element={<NonAddProduct />} />
                    <Route path="/admin/budget/update-budget" element={<UpdateBudget />} />
                    <Route path="/admin/budget/non-update-budget" element={<NonUpdateBudget />} />
                    <Route path="/admin/budget/view-reports" element={<ViewReports />} />
                    <Route path="/admin/budget/expenditure" element={<Expenditure />} />

                    {/* Reports Page */}
                    <Route path="/admin/reports" element={<Reports />} />
                    <Route path="/admin/reports/sub-reports" element={<SubReports />} />
                    <Route path="/admin/reports/trends" element={<Trends />} />
                    <Route path="/admin/reports/procurement" element={<Procurement />} />

                    {/* Procurement Module Routes */}
                    <Route path="/admin/procurement" element={<ProcurementDashboard />} />
                    <Route path="/admin/procurement/requests" element={<ProcurementRequests />} />
                    <Route path="/admin/procurement/new-request" element={<NewRequest />} />

                    {/* Compilance Audit */}
                    <Route path="/admin/compilance-audit" element={<CompilanceAudit />} />
                    <Route path="/admin/compilance-audit/audit" element={<Audit />} />
                    <Route path="/admin/compilance-audit/audit-policies" element={<AuditPolicies />} />
                    <Route path="/admin/compilance-audit/audit-procurement" element={<AuditProcurement />} />
                    <Route path="/admin/compilance-audit/audit-reports" element={<AuditReports />} />

                    {/* Notifications Page */}
                    <Route path="/admin/notifications" element={<Notifications />} />
                    <Route path="/admin/notifications/notifications-procurement" element={<NotificationsProcurement />} />
                    <Route path="/admin/notifications/alerts" element={<Alerts />} />
                    <Route path="/admin/notifications/chat-box" element={<ChatBox />} />

                    {/* Inventory Page */}
                    <Route path="/admin/inventory" element={<Inventory />} />
                    <Route path="/admin/inventory/inventory-dashboard" element={<InventoryDashboard />} />
                    <Route path="/admin/inventory/inventory-page" element={<InventoryPage />} />
                    <Route path="/admin/inventory/inventory-reports" element={<InventoryReports />} />
                    <Route path="/admin/inventory/item-entry" element={<ItemEntry />} />
                    <Route path="/admin/inventory/stock-levels" element={<StockLevels />} />


                  </>
                )}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </>
        )}

        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/vendor-registration" element={<VendorRegistration />} />
          {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
    </AppProvider>
  );
}

export default App;
