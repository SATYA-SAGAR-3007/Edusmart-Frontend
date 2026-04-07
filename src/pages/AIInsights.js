import React, { useEffect, useState } from "react";
import API from "../services/api";

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const res = await API.get("/assignments/insights");
    setInsights(res.data.insights);
    setWeakTopics(res.data.weakTopics);
  };

  /* 🔍 FILTERING */
  const filteredInsights = insights.filter((i) =>
    i.topic.toLowerCase().includes(search.toLowerCase())
  );

  const filteredWeakTopics = weakTopics.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>🤖 AI Insights</h2>
        <p style={styles.subtitle}>Analyze student performance trends</p>
      </div>

      {/* 🔍 SEARCH */}
      <div style={styles.searchBox}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          placeholder="Search topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* MAIN GRID */}
      <div style={styles.grid}>

        {/* 📊 TOPIC PERFORMANCE */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Topic Performance</h3>

          {filteredInsights.length === 0 ? (
            <p style={styles.noData}>No topics found</p>
          ) : (
            <div style={styles.list}>
              {filteredInsights.map((i, index) => (
                <div key={index} style={styles.item}>
                  
                  <div>
                    <p style={styles.topic}>{i.topic}</p>
                    <p style={styles.percentage}>
                      {Math.round(i.percentage)}%
                    </p>
                  </div>

                  <span
                    style={{
                      ...styles.badge,
                      ...getBadgeStyle(i.level),
                    }}
                  >
                    {i.level}
                  </span>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* ⚠ WEAK TOPICS */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>⚠ Weak Topics</h3>

          {filteredWeakTopics.length === 0 ? (
            <p style={styles.noData}>No weak topics 🎉</p>
          ) : (
            <div style={styles.weakList}>
              {filteredWeakTopics.map((t, index) => (
                <div key={index} style={styles.weakItem}>
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default AIInsights;

/* 🔥 Badge Colors */
function getBadgeStyle(level) {
  if (level === "good") {
    return { background: "#dcfce7", color: "#166534" };
  }
  if (level === "avg") {
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
    width: "300px",
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

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginBottom: "15px",
    color: "#1e293b",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    background: "#f8fafc",
  },

  topic: {
    margin: 0,
    fontWeight: "500",
  },

  percentage: {
    margin: 0,
    fontSize: "12px",
    color: "#64748b",
  },

  badge: {
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
  },

  weakList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  weakItem: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
  },

  noData: {
    color: "#64748b",
  },
};