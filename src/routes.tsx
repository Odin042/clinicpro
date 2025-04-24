import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import LandingHome from "./pages/Home"
import DashboardLayout from "./pages/Dashboard/Layout" 
import DashboardHome from "./pages/Dashboard/components/Home"
import PatientsList from "./pages/Dashboard/components/Home/PatientsList"
import CalendarAppointments from "./pages/Dashboard/components/Scheduling"
import { RegisterForm } from "./pages/Register/components/RegisterForm"
import { Login } from "./pages/Login/LoginForm"
import ForgotPassword from "./pages/components/ForgotPassword"
import ResetPassword from "./pages/ExternalResetPassword"
import PatientDetails from "./pages/Dashboard/components/Home/PatientsList/components"

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path='patient/:id' element={<PatientDetails />} /> 
          <Route path="calendar" element={<CalendarAppointments />} />
        </Route>

        <Route
          path="/calendar"
          element={<Navigate to="/dashboard/calendar" replace />}
        />
        <Route
          path="/patients"
          element={<Navigate to="/dashboard/patients" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
