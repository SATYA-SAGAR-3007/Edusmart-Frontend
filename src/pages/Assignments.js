import React, { useState } from "react";
import API from "../services/api";

function Assignments() {
  const [form, setForm] = useState({
    studentId: "",
    topic: "",
    score: "",
    maxScore: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/assignments", {
        student_id: form.studentId,
        topic: form.topic,
        score: form.score,
        max_score: form.maxScore,
        date: form.date,
      });

      alert("Assignment Added ✅");

      setForm({
        studentId: "",
        topic: "",
        score: "",
        maxScore: "",
        date: "",
      });
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📝 Assignments</h2>
        <p style={styles.subtitle}>Add and track student performance</p>
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
            name="topic"
            placeholder="Topic (e.g. DBMS, AI)"
            value={form.topic}
            onChange={handleChange}
          />

          {/* 🔥 SCORE GROUP */}
          <div style={styles.row}>
            <Input
              name="score"
              placeholder="Score"
              value={form.score}
              onChange={handleChange}
            />

            <Input
              name="maxScore"
              placeholder="Max Score"
              value={form.maxScore}
              onChange={handleChange}
            />
          </div>

          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <button type="submit" style={styles.button}>
            ➕ Add Assignment
          </button>

        </form>

      </div>

    </div>
  );
}

export default Assignments;

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
    maxWidth: "450px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  /* 🔥 GROUPED INPUTS */
  row: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
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