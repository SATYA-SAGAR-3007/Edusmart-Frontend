import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/student-login", {
        email,
        password,
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", "student");
        localStorage.setItem(
          "student",
          JSON.stringify(res.data.student)
        );

        navigate(`/student-dashboard/${res.data.student.id}`);
      }
    } catch (err) {
      alert("Invalid login ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🎓 Student Login</h2>
        <p style={styles.subText}>Welcome back! Please login</p>

        <input
          type="email"
          placeholder="📧 Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="🔒 Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/student-signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;

/* ================== STYLES ================== */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #6366f1, #3b82f6)",
  },

  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },

  heading: {
    marginBottom: "5px",
    textAlign: "center",
    color: "#1e293b",
  },

  subText: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#64748b",
  },

  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },

  footerText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },

  link: {
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "500",
  },
};