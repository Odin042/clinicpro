import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { RegisterForm } from './pages/Register/components/RegisterForm'
import { Login } from './pages/Login/LoginForm'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/components/ForgotPassword'
import ResetPassword from './pages/ExternalResetPassword'
import CalendarAppointments from './pages/Dashboard/components/Scheduling'



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarAppointments />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;