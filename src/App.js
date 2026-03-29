import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Login from "./pages/Login";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./pages/StudentLogin";

import TeacherSignup from "./pages/TeacherSignup";
import StudentSignup from "./pages/StudentSignup";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Performance from "./pages/Performance";
import AIInsights from "./pages/AIInsights";
import RiskDashboard from "./pages/RiskDashboard";

import StudentDashboard from "./pages/StudentDashboard";
import StudentPerformance from "./pages/StudentPerformance";
import StudentTasks from "./pages/StudentTasks";
import StudentInsights from "./pages/StudentInsights";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route path="/" element={<Login />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* Student pages */}
        <Route path="/student-dashboard/:id" element={<StudentDashboard />} />
        <Route path="/student-performance/:id" element={<StudentPerformance />} />
        <Route path="/student-tasks/:id" element={<StudentTasks />} />
        <Route path="/student-insights/:id" element={<StudentInsights />} />

        {/* Teacher pages with sidebar */}
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/teacher-dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/students" element={<Layout><Students /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/assignments" element={<Layout><Assignments /></Layout>} />
        <Route path="/performance" element={<Layout><Performance /></Layout>} />
        <Route path="/insights" element={<Layout><AIInsights /></Layout>} />
        <Route path="/risk" element={<Layout><RiskDashboard /></Layout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;