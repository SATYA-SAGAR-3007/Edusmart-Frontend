import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px 0"
  };

  const logout = () => {
localStorage.clear()
window.location.href="/"
}

  return (

    <div style={{ display: "flex" }}>

      <div style={{
        width: "230px",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "25px"
      }}>

        <h2>EduSmart</h2>

        <nav style={{marginTop:"30px"}}>

          <Link to="/" style={linkStyle}>Dashboard</Link>

          <Link to="/students" style={linkStyle}>Students</Link>

          <Link to="/attendance" style={linkStyle}>Attendance</Link>

          <Link to="/assignments" style={linkStyle}>Assignments</Link>

          <Link to="/performance" style={linkStyle}>Performance</Link>

          <Link to="/insights" style={linkStyle}>AI Insights</Link>

          <Link to="/risk" style={linkStyle}>Risk Dashboard</Link>

            <button onClick={logout}>
Logout
</button>

        </nav>

      </div>

      <div style={{
        flex: 1,
        padding: "40px",
        background: "#f1f5f9"
      }}>
        {children}
      </div>
      

    </div>

  );

}

export default Layout;