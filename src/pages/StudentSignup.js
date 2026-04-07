import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function StudentSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.department ||
      !form.year
    ) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      await API.post("/auth/student-signup", form);
      alert("Student registered successfully ✅");
      navigate("/student-login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🎓 Student Signup</h2>
        <p style={styles.subText}>Create your account</p>

        <input
          name="name"
          placeholder="👤 Full Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="📧 Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="🔒 Password"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="department"
          placeholder="🏫 Department"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="year"
          placeholder="📅 Year"
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/student-login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentSignup;

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
    padding: "35px",
    borderRadius: "16px",
    width: "360px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "5px",
    color: "#1e293b",
  },

  subText: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#64748b",
  },

  input: {
    padding: "12px",
    marginBottom: "12px",
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