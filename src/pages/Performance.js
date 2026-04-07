import React, { useEffect, useState } from "react";
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

function Performance() {
  const [assignments, setAssignments] = useState([]);
  const [page, setPage] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await API.get("/assignments");
    setAssignments(res.data);
  };

  /* 🔥 SHOW LATEST FIRST */
  const reversed = [...assignments].reverse();

  const paginatedData = reversed.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  /* 🔥 STATS */
  const total = assignments.length;
  const avg =
    total > 0
      ? (
          assignments.reduce((sum, a) => sum + a.score, 0) / total
        ).toFixed(1)
      : 0;

  /* 🔥 CHART DATA */
  const data = {
    labels: paginatedData.map((a) => a.topic),
    datasets: [
      {
        label: "Score",
        data: paginatedData.map((a) => a.score),
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📊 Performance</h2>
        <p style={styles.subtitle}>Track assignment performance</p>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Total Assignments" value={total} />
        <Stat title="Average Score" value={avg} />
      </div>

      {/* CHART CARD */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Performance Overview</h3>

        {/* 🔥 SLIDE ANIMATION */}
        <div key={page} style={styles.slide}>
          <Bar data={data} options={{ maintainAspectRatio: false }} />
        </div>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            style={styles.pageBtn}
          >
            ◀ Prev
          </button>

          <span style={styles.pageText}>
            Page {page + 1}
          </span>

          <button
            onClick={() =>
              setPage((p) =>
                (p + 1) * itemsPerPage < assignments.length ? p + 1 : p
              )
            }
            style={styles.pageBtn}
          >
            Next ▶
          </button>

        </div>

      </div>

    </div>
  );
}

export default Performance;

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
  },

  cardTitle: {
    marginBottom: "10px",
    color: "#1e293b",
  },

  /* 🔥 CHART + ANIMATION */
  slide: {
    height: "300px",
    animation: "slideFade 0.4s ease",
  },

  /* 🔥 PAGINATION */
  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  },

  pageBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
  },

  pageText: {
    color: "#1e293b",
  },
};