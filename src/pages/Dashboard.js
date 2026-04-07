import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({});
  const [weakTopics, setWeakTopics] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await API.get("/dashboard/stats");
      const insightsRes = await API.get("/assignments/insights");

      setStats(statsRes.data);
      setWeakTopics(insightsRes.data.weakTopics);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: ["Assignments", "Attendance"],
    datasets: [
      {
        label: "Activity",
        data: [stats.totalAssignments || 0, stats.totalAttendance || 0],
        backgroundColor: ["#6366f1", "#3b82f6"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>📊 Dashboard</h2>
        <p>Welcome back 👋</p>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <StatCard title="Students" value={stats.totalStudents} />
        <StatCard title="Assignments" value={stats.totalAssignments} />
        <StatCard title="Attendance" value={stats.totalAttendance} />
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.mainGrid}>
        
        {/* CHART */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Activity</h3>
          <div style={{ height: "180px" }}>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* WEAK TOPICS */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>⚠ Weak Topics</h3>

          {weakTopics.length === 0 ? (
            <p style={styles.empty}>No weak topics 🎉</p>
          ) : (
            <ul style={styles.list}>
              {weakTopics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

/* ================= COMPONENT ================= */

function StatCard({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statTitle}>{title}</p>
      <h2 style={styles.statValue}>{value ?? 0}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "25px",
    background: "#f1f5f9",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },

  header: {
    marginBottom: "20px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  statTitle: {
    fontSize: "13px",
    color: "#64748b",
  },

  statValue: {
    margin: 0,
    color: "#6366f1",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "15px",
  },

  card: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginBottom: "10px",
    color: "#1e293b",
  },

  empty: {
    color: "#64748b",
  },

  list: {
    paddingLeft: "18px",
    color: "#ef4444",
  },
};