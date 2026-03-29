import React from "react";
import { Link } from "react-router-dom";

const sidebarStyle = {
  width: "220px",
  background: "#0f172a",
  color: "white",
  height: "100vh",
  padding: "20px",
  position: "fixed"
};

const contentStyle = {
  marginLeft: "240px",
  padding: "30px"
};

const logout = () => {
localStorage.clear()
window.location.href="/"
}

function StudentLayout({ children, studentId }) {

  return (

    <div>

      <div style={sidebarStyle}>

        <h2>EduSmart</h2>

        <p style={{marginTop:"30px"}}>Student Panel</p>

        <div style={{marginTop:"20px"}}>

          <Link to={`/student-dashboard/${studentId}`} style={{color:"white",display:"block",marginBottom:"15px"}}>
            Dashboard
          </Link>

          <Link to={`/student-performance/${studentId}`} style={{color:"white",display:"block",marginBottom:"15px"}}>
            Performance
          </Link>

          <Link to={`/student-tasks/${studentId}`} style={{color:"white",display:"block",marginBottom:"15px"}}>
            Tasks
          </Link>

          <Link to={`/student-insights/${studentId}`} style={{color:"white",display:"block"}}>
            AI Insights
          </Link>

          <button onClick={logout}>
Logout
</button>

        </div>

      </div>

      <div style={contentStyle}>
        {children}
      </div>

    </div>

  );

}

export default StudentLayout;