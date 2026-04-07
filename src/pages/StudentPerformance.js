import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

function StudentPerformance() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    API.get(`/assignments/student/${id}`).then((res) => {
      setAssignments(res.data);
    });
  }, [id]);

  /* 🔥 STATS */
  const total = assignments.length;
  const avg =
    total > 0
      ? (
          assignments.reduce((sum, a) => sum + a.score, 0) / total
        ).toFixed(1)
      : 0;

  return (
    <StudentLayout studentId={id}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Performance</h1>
        <p style={styles.subtitle}>Your assignment performance overview</p>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Total Assignments" value={total} />
        <Stat title="Average Score" value={avg} />
      </div>

      {/* TABLE */}
      <div style={styles.card}>
        <table style={styles.table}>
          
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "60px" }}>#</th>
              <th style={styles.th}>Topic</th>
              <th style={{ ...styles.th, width: "120px" }}>Score</th>
            </tr>
          </thead>

          <tbody>
            {assignments.length > 0 ? (
              assignments.map((a, i) => (
                <tr key={i} style={styles.row}>
                  <td style={styles.td}>{i + 1}</td>

                  <td style={styles.td}>
                    <span style={styles.topic}>{a.topic}</span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.score}>{a.score}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={styles.noData}>
                  No assignments found 😕
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </StudentLayout>
  );
}

export default StudentPerformance;

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
    borderRadius: "16px",
    padding: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    padding: "10px 15px",
    color: "#64748b",
    fontSize: "13px",
  },

  td: {
    padding: "12px 15px",
  },

  row: {
    background: "#f8fafc",
  },

  topic: {
    fontWeight: "500",
    color: "#1e293b",
  },

  score: {
    background: "#e0e7ff",
    color: "#4338ca",
    padding: "5px 10px",
    borderRadius: "8px",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
  },
};