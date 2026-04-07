import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function StudentProfile() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [weakTopics, setWeakTopics] = useState([]);

  /* 🔹 FETCH BASE DATA */
  useEffect(() => {
    fetchStudent();
    fetchAssignments();
    fetchInsights();
  }, [id]);

  const fetchStudent = async () => {
    const res = await API.get(`/students/${id}`);
    setStudent(res.data);
  };

  const fetchAssignments = async () => {
    const res = await API.get(`/assignments/student/${id}`);
    setAssignments(res.data);
  };

  const fetchInsights = async () => {
    const res = await API.get(`/assignments/insights/student/${id}`);
    setWeakTopics(res.data.weakTopics);
  };

  /* 🔥 FIXED PREDICTION (runs AFTER assignments load) */
  useEffect(() => {
    if (assignments.length === 0) return;

    const fetchPrediction = async () => {
      const avgScore =
        assignments.reduce((s, a) => s + a.score, 0) / assignments.length;

      const res = await API.post("/assignments/predict", {
        attendance: 80, // replace with real later
        assignmentScore: avgScore
      });

      setPrediction(res.data.predicted_score);
    };

    fetchPrediction();
  }, [assignments]);

  const chartData = {
    labels: assignments.map((a) => a.topic),
    datasets: [
      {
        label: "Score",
        data: assignments.map((a) => a.score),
        backgroundColor: "#6366f1",
        borderRadius: 6
      }
    ]
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      
      {/* PROFILE HEADER */}
      <div style={styles.profileCard}>
        <h2 style={styles.name}>{student.name}</h2>
        <p style={styles.info}>{student.email}</p>

        <div style={styles.meta}>
          <span>{student.department}</span>
          <span>Year {student.year}</span>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Assignments" value={assignments.length} />
        <Stat title="Predicted Score" value={prediction ? `${prediction}/100` : "--"} />
        <Stat title="Weak Topics" value={weakTopics.length} />
      </div>

      {/* CHART */}
      <div style={styles.card}>
        <h3>📊 Performance</h3>
        <div style={styles.chart}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div style={styles.card}>
        <h3>🤖 AI Recommendations</h3>

        {weakTopics.length === 0 ? (
          <p style={styles.good}>🎉 No weak topics</p>
        ) : (
          <div style={styles.topics}>
            {weakTopics.map((t, i) => (
              <span key={i} style={styles.badge}>
                ⚠ {t}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default StudentProfile;

/* 🔥 STAT COMPONENT */
function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statTitle}>{title}</p>
      <h2 style={styles.statValue}>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "20px",
  },

  profileCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  name: {
    margin: 0,
    color: "#1e293b",
  },

  info: {
    color: "#64748b",
  },

  meta: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    color: "#6366f1",
  },

  stats: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    minWidth: "150px",
  },

  statTitle: {
    fontSize: "12px",
    color: "#64748b",
  },

  statValue: {
    margin: 0,
    color: "#6366f1",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  chart: {
    height: "300px",
  },

  topics: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  badge: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "13px",
  },

  good: {
    color: "#16a34a",
  },
};