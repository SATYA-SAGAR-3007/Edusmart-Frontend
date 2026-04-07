import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/teacher-login", {
        username,
        password,
      });

      if (res.data.message === "Login successful") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", "teacher");
        localStorage.setItem(
          "teacher",
          JSON.stringify(res.data.teacher)
        );

        navigate("/teacher-dashboard");
      }
    } catch (err) {
      alert("Invalid login ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>👩‍🏫 Teacher Login</h2>
        <p style={styles.subText}>Login to manage your students</p>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="🔒 Password"
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
            onClick={() => navigate("/teacher-signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default TeacherLogin;

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
    background: "#6366f1",
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
    color: "#6366f1",
    cursor: "pointer",
    fontWeight: "500",
  },
};