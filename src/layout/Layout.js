import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Attendance", path: "/attendance" },
    { name: "Assignments", path: "/assignments" },
    { name: "Performance", path: "/performance" },
    { name: "AI Insights", path: "/insights" },
    { name: "Risk Dashboard", path: "/risk" },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const getUserName = () => {
    const role = localStorage.getItem("userRole");

    if (role === "teacher") {
      const teacher = JSON.parse(localStorage.getItem("teacher"));
      return teacher?.name || "Teacher";
    }

    if (role === "student") {
      const student = JSON.parse(localStorage.getItem("student"));
      return student?.name || "Student";
    }

    return "User";
  };

  const getPageTitle = (path) => {
    const item = navItems.find((i) => i.path === path);
    return item ? item.name : "EduSmart";
  };

  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>🎓 EduSmart</h2>

        <nav style={styles.nav}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.link,
                  ...(isActive ? styles.activeLink : {}),
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <div style={styles.main}>
        
        {/* TOPBAR */}
        <header style={styles.topbar}>
          
          <div>
            <h3 style={styles.pageTitle}>
              {getPageTitle(location.pathname)}
            </h3>
            <p style={styles.date}>
              {new Date().toDateString()}
            </p>
          </div>

          <div style={styles.rightSection}>
            
            <span style={styles.icon}>🔔</span>

            {/* PROFILE DROPDOWN */}
            <div style={styles.profileWrapper}>
              <div
                style={styles.userBox}
                onClick={() => setOpen(!open)}
              >
                <span>👤</span>
                <span>{getUserName()}</span>
              </div>

              {open && (
                <div style={styles.dropdown}>
                  <p style={styles.dropdownItem}>Profile</p>
                  <p style={styles.dropdownItem}>Settings</p>
                  <hr style={{ margin: "5px 0" }} />
                  <p
                    style={{ ...styles.dropdownItem, color: "#ef4444" }}
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <main style={styles.content}>
          {children}
        </main>

      </div>
    </div>
  );
}

export default Layout;

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },

  sidebar: {
    width: "230px",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },

  logo: {
    marginBottom: "25px",
  },

  nav: {
    flex: 1,
  },

  link: {
    display: "block",
    padding: "10px 12px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
    marginBottom: "8px",
    transition: "0.2s",
  },

  activeLink: {
    background: "#1e293b",
    fontWeight: "500",
  },

  logoutBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f1f5f9",
  },

  topbar: {
    height: "60px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },

  pageTitle: {
    margin: 0,
    color: "#1e293b",
  },

  date: {
    margin: 0,
    fontSize: "12px",
    color: "#64748b",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  icon: {
    fontSize: "18px",
    cursor: "pointer",
  },

  profileWrapper: {
    position: "relative",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8fafc",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    top: "45px",
    right: "0",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    width: "150px",
    zIndex: 10,
  },

  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },

  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};