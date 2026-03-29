import React, { useState } from "react";
import API from "../services/api";

function Assignments() {

  const [studentId, setStudentId] = useState("");
  const [topic, setTopic] = useState("");
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/assignments", {
      student_id: studentId,
      topic,
      score,
      max_score: maxScore,
      date
    });

    alert("Assignment Added");
  };

  return (
    <div>

      <h2>Add Assignment Score</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <br/>

        <input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <br/>

        <input
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <br/>

        <input
          placeholder="Max Score"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
        />

        <br/>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br/>

        <button type="submit">
          Add Assignment
        </button>

      </form>

    </div>
  );
}

export default Assignments;