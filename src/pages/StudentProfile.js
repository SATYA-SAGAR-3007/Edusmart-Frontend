import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function StudentProfile() {

  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [weakTopics, setWeakTopics] = useState([]);
  
const chartData = {
  labels: assignments.map(a => a.topic),
  datasets: [
    {
      label: "Assignment Score",
      data: assignments.map(a => a.score),
      backgroundColor: "#3b82f6"
    }
  ]
};
const fetchInsights = async () => {

  const res = await API.get("/assignments/insights");

  setWeakTopics(res.data.weakTopics);

};
const fetchPrediction = async () => {

  const attendance = 80; // example for now
  const avgScore = assignments.reduce((s,a)=>s+a.score,0)/assignments.length;

  const res = await API.post("/assignments/predict",{
    attendance,
    assignmentScore: avgScore
  });

  setPrediction(res.data.predicted_score);

};


  useEffect(() => {
    fetchStudent();
    fetchAssignments();
    fetchInsights();
    fetchPrediction();

    // eslint-disable-next-line
    
}, []);

  const fetchStudent = async () => {
    const res = await API.get(`/students/${id}`);
    setStudent(res.data);
  };

  const fetchAssignments = async () => {

  const res = await API.get(`/assignments/student/${id}`);

  setAssignments(res.data);

};


  if (!student) return <p>Loading...</p>;

  return (

    <div>

      <h2>Student Profile</h2>

      <p>Name: {student.name}</p>
      <p>Email: {student.email}</p>
      <p>Department: {student.department}</p>
      <p>Year: {student.year}</p>

      <h3>AI Recommendations</h3>

<ul>

  {weakTopics.length === 0 ? (
    <p>No weak topics detected</p>
  ) : (
    weakTopics.map((topic, index) => (
      <li key={index}>
⚠ Focus on: {topic}
</li>
    ))
  )}

</ul>
<h3>Assignment Performance</h3>

<Bar data={chartData} />

<h3>Predicted Final Score</h3>

<p>{prediction ? `${prediction} / 100` : "Calculating..."}</p>

    </div>

  );

}

export default StudentProfile;