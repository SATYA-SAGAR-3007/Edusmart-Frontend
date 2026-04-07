import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (role === "teacher") {
      navigate("/teacher-dashboard");
    }

    if (role === "student") {
      const studentData = localStorage.getItem("student");

      if (studentData) {
        const student = JSON.parse(studentData);
        if (student?.id) {
          navigate(`/student-dashboard/${student.id}`);
        }
      }
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🎓 EduSmart</h1>
        <p style={styles.subText}>Login or create your account</p>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Teacher</h3>

          <button
            style={{ ...styles.button, ...styles.primary }}
            onClick={() => navigate("/teacher-login")}
          >
            Login
          </button>

          <button
            style={{ ...styles.button, ...styles.outline }}
            onClick={() => navigate("/teacher-signup")}
          >
            Sign Up
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Student</h3>

          <button
            style={{ ...styles.button, ...styles.primary }}
            onClick={() => navigate("/student-login")}
          >
            Login
          </button>

          <button
            style={{ ...styles.button, ...styles.outline }}
            onClick={() => navigate("/student-signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

/* ================== STYLES ================== */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #3b82f6, #6366f1)",
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },

  heading: {
    marginBottom: "5px",
    color: "#1e293b",
  },

  subText: {
    marginBottom: "25px",
    color: "#64748b",
  },

  section: {
    marginBottom: "25px",
  },

  sectionTitle: {
    marginBottom: "10px",
    color: "#334155",
  },

  button: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    border: "none",
    transition: "0.2s",
  },

  primary: {
    background: "#3b82f6",
    color: "white",
  },

  outline: {
    background: "transparent",
    border: "1px solid #3b82f6",
    color: "#3b82f6",
  },
};