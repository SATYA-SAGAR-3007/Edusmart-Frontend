import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

function StudentInsights() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    API.get(`/assignments/insights/student/${id}`)
      .then(res => setTopics(res.data.weakTopics));
  }, [id]);

  return (
    <StudentLayout studentId={id}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🤖 AI Insights</h1>
        <p style={styles.subtitle}>
          Personalized recommendations to improve your performance
        </p>
      </div>

      {/* CONTENT */}
      {topics.length === 0 ? (
        <div style={styles.card}>
          <p style={styles.success}>
            🎉 Great job! No weak topics detected.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          
          {topics.map((topic, index) => (
            <div key={index} style={styles.card}>
              
              <h3 style={styles.topic}>📌 {topic}</h3>

              <p style={styles.desc}>
                Focus more on this topic. Revise concepts and practice problems regularly.
              </p>

              <div style={styles.tip}>
                💡 Tip: Try solving 3–5 questions daily on {topic}
              </div>

            </div>
          ))}

        </div>
      )}

    </StudentLayout>
  );
}

export default StudentInsights;

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
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  topic: {
    marginBottom: "10px",
    color: "#ef4444",
  },

  desc: {
    fontSize: "14px",
    color: "#475569",
  },

  tip: {
    marginTop: "10px",
    background: "#fef9c3",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#854d0e",
  },

  success: {
    color: "#16a34a",
    fontWeight: "500",
  },
};