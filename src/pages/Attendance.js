import React, { useState } from "react";
import API from "../services/api";

function Attendance() {

  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/attendance", {
      student_id: studentId,
      date,
      status
    });

    alert("Attendance Added");
  };

  return (
    <div>

      <h2>Add Attendance</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <br/>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br/>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <br/>

        <button type="submit">
          Add Attendance
        </button>

      </form>

    </div>
  );
}

export default Attendance;