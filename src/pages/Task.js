import React, { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  /* 🔥 STATS */
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📋 Teacher Tasks</h2>
        <p style={styles.subtitle}>Manage assigned tasks</p>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat title="Total Tasks" value={total} />
        <Stat title="Pending" value={pending} />
        <Stat title="Completed" value={completed} />
      </div>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <div style={styles.emptyCard}>
          <p style={styles.emptyText}>No tasks available</p>
        </div>
      ) : (
        <div style={styles.grid}>
          
          {tasks.map((t) => (
            <div key={t.id} style={styles.card}>
              
              <h3 style={styles.taskTitle}>{t.title}</h3>

              <span
                style={{
                  ...styles.badge,
                  ...getStatusStyle(t.status)
                }}
              >
                {t.status}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Tasks;

/* 🔥 STAT COMPONENT */
function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statTitle}>{title}</p>
      <h2 style={styles.statValue}>{value}</h2>
    </div>
  );
}

/* 🔥 STATUS COLOR */
function getStatusStyle(status) {
  if (status === "completed") {
    return { background: "#dcfce7", color: "#166534" };
  }
  return { background: "#fef9c3", color: "#854d0e" };
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  taskTitle: {
    fontSize: "15px",
    color: "#1e293b",
    marginBottom: "10px",
  },

  badge: {
    alignSelf: "flex-start",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
  },

  emptyCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  emptyText: {
    color: "#64748b",
  },
};