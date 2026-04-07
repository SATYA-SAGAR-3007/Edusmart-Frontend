import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

function StudentTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get(`/tasks/student/${id}`)
      .then(res => setTasks(res.data));
  }, [id]);

  return (
    <StudentLayout studentId={id}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📋 My Tasks</h1>
        <p style={styles.subtitle}>Stay on track with your tasks</p>
      </div>

      {/* CONTENT */}
      {tasks.length === 0 ? (
        <div style={styles.emptyCard}>
          <p style={styles.emptyText}>🎉 No tasks assigned</p>
        </div>
      ) : (
        <div style={styles.grid}>
          
          {tasks.map((task) => (
            <div key={task.id} style={styles.card}>
              
              <p style={styles.taskText}>{task.task}</p>

              {/* Optional status (if backend adds later) */}
              <span style={styles.badge}>
                Pending
              </span>

            </div>
          ))}

        </div>
      )}

    </StudentLayout>
  );
}

export default StudentTasks;

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

  taskText: {
    fontSize: "14px",
    color: "#1e293b",
    marginBottom: "10px",
  },

  badge: {
    alignSelf: "flex-start",
    background: "#fef9c3",
    color: "#854d0e",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
  },

  emptyCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  emptyText: {
    color: "#16a34a",
    fontWeight: "500",
  },
};