import React, { useState } from "react";
import API from "../services/api";

function AddStudent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  await API.post("/students", {
    name,
    email,
    department,
    year
  });

  alert("Student Added");

  window.location.reload();
};

  return (
    <div>

      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br/>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br/>

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <br/>

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <br/>

        <button type="submit">
          Add Student
        </button>

      </form>

    </div>
  );
}

export default AddStudent;