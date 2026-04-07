import React, { useState } from "react";
import API from "../services/api";

function Attendance() {
  const [form, setForm] = useState({
    studentId: "",
    date: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/attendance", {
        student_id: form.studentId,
        date: form.date,
        status: form.status,
      });

      alert("Attendance Added ✅");

      setForm({
        studentId: "",
        date: "",
        status: "",
      });
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📅 Attendance</h2>
        <p style={styles.subtitle}>Record student attendance</p>
      </div>

      {/* FORM CARD */}
      <div style={styles.card}>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          
          <Input
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
          />

          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select Status</option>
            <option value="present">✅ Present</option>
            <option value="absent">❌ Absent</option>
          </select>

          <button type="submit" style={styles.button}>
            ➕ Add Attendance
          </button>

        </form>

      </div>

    </div>
  );
}

export default Attendance;

/* 🔥 Reusable Input */
function Input({ name, placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={styles.input}
    />
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "20px",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    color: "#1e293b",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "13px",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    maxWidth: "400px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    background: "#ffffff",
    cursor: "pointer",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right, #6366f1, #3b82f6)",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
  },
};