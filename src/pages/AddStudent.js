import React, { useState } from "react";
import API from "../services/api";

function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/students", form);
      alert("Student Added ✅");

      setForm({
        name: "",
        email: "",
        department: "",
        year: "",
      });
    } catch (err) {
      alert("Error adding student ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      
      <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
      <Input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
      <Input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      <Input name="year" placeholder="Year (e.g. 3rd)" value={form.year} onChange={handleChange} />

      <button type="submit" style={styles.button}>
        ➕ Add Student
      </button>

    </form>
  );
}

export default AddStudent;

/* 🔥 Reusable Input Component */
function Input({ name, placeholder, value, onChange }) {
  return (
    <input
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  button: {
    marginTop: "5px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right, #6366f1, #3b82f6)",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
    transition: "0.2s",
  },
};