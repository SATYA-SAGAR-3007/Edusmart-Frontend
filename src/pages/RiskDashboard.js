import React, { useEffect, useState } from "react";
import API from "../services/api";

function RiskDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRiskStudents();
  }, []);

  const fetchRiskStudents = async () => {
    const res = await API.get("/attendance/risk");
    setStudents(res.data);
  };

  /* 🔍 FILTER */
  const filteredStudents = students.filter((s) =>
    s.student_id.toString().includes(search)
  );

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>🚨 Risk Dashboard</h2>
        <p style={styles.subtitle}>Identify students at risk</p>
      </div>

      {/* 🔍 SEARCH */}
      <div style={styles.searchBox}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          placeholder="Search by Student ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      <div style={styles.card}>
        <table style={styles.table}>
          
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "120px" }}>Student ID</th>
              <th style={{ ...styles.th, width: "150px" }}>Attendance</th>
              <th style={styles.th}>Risk Level</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, index) => (
                <tr key={index} style={styles.row}>
                  
                  <td style={styles.td}>{s.student_id}</td>

                  <td style={styles.td}>
                    {Math.round(s.attendance)}%
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...getRiskStyle(s.risk),
                      }}
                    >
                      {s.risk}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={styles.noData}>
                  No students found 😕
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default RiskDashboard;

/* 🔥 Risk Badge Colors */
function getRiskStyle(risk) {
  if (risk === "low") {
    return { background: "#dcfce7", color: "#166534" };
  }
  if (risk === "medium") {
    return { background: "#fef9c3", color: "#854d0e" };
  }
  return { background: "#fee2e2", color: "#991b1b" };
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "20px",
  },

  header: {
    marginBottom: "15px",
  },

  title: {
    margin: 0,
    color: "#1e293b",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "13px",
  },

  /* 🔍 SEARCH */
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#ffffff",
    padding: "10px 14px",
    borderRadius: "999px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    marginBottom: "20px",
    width: "280px",
  },

  searchIcon: {
    marginRight: "8px",
  },

  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    width: "100%",
  },

  /* TABLE */
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
    verticalAlign: "middle",
  },

  row: {
    background: "#f8fafc",
    borderRadius: "10px",
  },

  badge: {
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
  },
};