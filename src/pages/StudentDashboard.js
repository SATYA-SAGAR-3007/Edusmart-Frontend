import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";
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

function StudentDashboard() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [weakTopics, setWeakTopics] = useState([]);
  const [attendance, setAttendance] = useState(0);
  const [risk, setRisk] = useState("");

  useEffect(() => {
    API.get(`/students/${id}`).then(res => setStudent(res.data));
    API.get(`/assignments/student/${id}`).then(res => setAssignments(res.data));
    API.get(`/assignments/insights/student/${id}`)
      .then(res => setWeakTopics(res.data.weakTopics));

    API.get(`/attendance/student/${id}`).then(res => {
      const percentage = res.data.attendance;
      setAttendance(percentage);

      let riskLevel = "Safe";
      if (percentage < 65) riskLevel = "High Risk";
      else if (percentage < 80) riskLevel = "Warning";

      setRisk(riskLevel);
    });
  }, [id]);

  useEffect(() => {
    const fetchPrediction = async () => {
      if (assignments.length === 0) return;

      const avgScore =
        assignments.reduce((sum, a) => sum + a.score, 0) / assignments.length;

      try {
        const res = await API.post("/assignments/predict", {
          attendance,
          assignmentScore: avgScore
        });
        setPrediction(res.data.predicted_score);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrediction();
  }, [assignments, attendance]);

  const chartData = {
    labels: assignments.map(a => a.topic),
    datasets: [
      {
        label: "Score",
        data: assignments.map(a => a.score),
        backgroundColor: "#6366f1",
        borderRadius: 6
      }
    ]
  };

  if (!student) return <p>Loading...</p>;

  return (
    <StudentLayout studentId={id}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome, {student.name}</h1>
        <p style={styles.subtitle}>Your academic overview</p>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Assignments" value={assignments.length} />
        <Stat title="Predicted Score" value={prediction ? `${prediction}/100` : "--"} />
        <Stat title="Weak Topics" value={weakTopics.length} />
        <Stat title="Attendance" value={`${attendance}%`} />

        <div style={{
          ...styles.statCard,
          ...getRiskCard(risk)
        }}>
          <p style={styles.statTitle}>Risk Level</p>
          <h2>{risk}</h2>
        </div>
      </div>

      {/* CHART */}
      <div style={styles.chartCard}>
        <h3 style={styles.cardTitle}>📊 Performance</h3>

        <div style={styles.chartContainer}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

    </StudentLayout>
  );
}

export default StudentDashboard;

/* 🔥 STAT COMPONENT */
function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statTitle}>{title}</p>
      <h2 style={styles.statValue}>{value}</h2>
    </div>
  );
}

/* 🔥 Risk Color */
function getRiskCard(risk) {
  if (risk === "High Risk") {
    return { background: "#fee2e2", color: "#991b1b" };
  }
  if (risk === "Warning") {
    return { background: "#fef9c3", color: "#854d0e" };
  }
  return { background: "#dcfce7", color: "#166534" };
}

/* ================= STYLES ================= */

const styles = {
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

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "15px",
    marginBottom: "25px",
  },

  statCard: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },

  statTitle: {
    fontSize: "12px",
    color: "#64748b",
  },

  statValue: {
    margin: 0,
    color: "#6366f1",
  },

  chartCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginBottom: "10px",
  },

  chartContainer: {
    height: "300px",
  },
};