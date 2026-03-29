import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Performance() {

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await API.get("/assignments");
    setAssignments(res.data);
  };

  const data = {
    labels: assignments.map(a => a.topic),
    datasets: [
      {
        label: "Score",
        data: assignments.map(a => a.score),
      }
    ]
  };

  return (
    <div>

      <h2>Student Performance</h2>

      <Bar data={data} />

    </div>
  );
}

export default Performance;