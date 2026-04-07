import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import AddStudent from "./AddStudent";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.heading}>📚 Students</h2>
        <p style={styles.subText}>Manage student records efficiently</p>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        
        {/* ADD STUDENT CARD */}
        <div style={styles.addCard}>
  
  <div style={styles.cardHeader}>
    <h4 style={styles.cardTitle}>➕ Add Student</h4>
    <p style={styles.cardSub}>Enter student details</p>
  </div>

  <div style={styles.form}>
    <AddStudent />
  </div>

</div>

        {/* SEARCH */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="🔍 Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </div>

      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
  <table style={styles.table}>
  <thead>
    <tr>
      <th style={{...styles.th, width: "60px"}}>ID</th>
      <th style={{...styles.th, width: "180px"}}>Name</th>
      <th style={{...styles.th}}>Email</th>
      <th style={{...styles.th, width: "140px"}}>Department</th>
      <th style={{...styles.th, width: "80px"}}>Year</th>
      <th style={{...styles.th, width: "80px"}}></th>
    </tr>
  </thead>

  <tbody>
    {filteredStudents.map((s) => (
      <tr key={s.id} style={styles.row}>
        <td style={styles.td}>{s.id}</td>

        <td style={styles.td}>
          <Link to={`/student/${s.id}`} style={styles.name}>
            {s.name}
          </Link>
        </td>

        <td style={styles.td}>{s.email}</td>

        <td style={styles.td}>
          <span style={styles.badge}>{s.department}</span>
        </td>

        <td style={styles.td}>{s.year}</td>

        <td style={styles.td}>
          <button
            onClick={() => deleteStudent(s.id)}
            style={styles.delete}
          >
            ✕
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

    </div>
  );
}

export default Students;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "20px",
  },

  header: {
    marginBottom: "20px",
  },

  heading: {
    margin: 0,
    color: "#1e293b",
  },

  subText: {
    marginTop: "5px",
    color: "#64748b",
  },

  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "20px",
  },

  /* 🔥 ADD CARD */
  addCard: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    minWidth: "280px",
  },

  cardTitle: {
    marginBottom: "12px",
    color: "#1e293b",
  },

  /* 🔥 SEARCH BOX */
  searchBox: {
    background: "#ffffff",
    padding: "12px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },

  /* 🔥 MODERN INPUT */
  search: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    outline: "none",
    width: "260px",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  /* TABLE */
  tableWrapper: {
    background: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },

  link: {
    textDecoration: "none",
    color: "#3b82f6",
    fontWeight: "500",
  },

  deleteBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
  },

  tableCard: {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
},

theadRow: {
  background: "transparent",
},

row: {
  background: "#f8fafc",
  transition: "0.2s",
},

name: {
  color: "#6366f1",
  fontWeight: "500",
  textDecoration: "none",
},

badge: {
  background: "#e0e7ff",
  color: "#4338ca",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
},

delete: {
  background: "#fee2e2",
  color: "#b91c1c",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
},

empty: {
  textAlign: "center",
  padding: "20px",
  color: "#64748b",
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
};