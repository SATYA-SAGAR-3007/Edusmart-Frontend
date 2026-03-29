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
  /*
  useEffect(() => {

  API.get("/students/my-students")
    .then(res => {

      console.log("API RESPONSE:", res.data) // 🔥 DEBUG

      // ✅ FORCE ARRAY
      if (Array.isArray(res.data)) {
        setStudents(res.data)
      } else if (Array.isArray(res.data.students)) {
        setStudents(res.data.students)
      } else {
        setStudents([])  // fallback
      }

    })
    .catch(err => {
      console.error(err)
      setStudents([])
    })

}, [])
*/
  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
  await API.delete(`/students/${id}`);
  fetchStudents();
};

  return (

    <div>

      <h2>Students</h2>

      <AddStudent/>

      <input
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px" }}
        />



      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >

        <thead style={{ background: "#e2e8f0" }}>

          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Department</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Year</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Delete</th>
          </tr>

        </thead>

        <tbody>

          {students.filter(s =>s.name.toLowerCase().includes(search.toLowerCase())).map((s) => (

            <tr key={s.id}>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{s.id}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{<Link to={`/student/${s.id}`}>
  {s.name}
</Link>}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{s.email}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{s.department}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{s.year}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
  <button onClick={() => deleteStudent(s.id)}>
    Delete
  </button>
</td>

            </tr>

          ))}

        </tbody>

      </table>


    </div>

  );

}

export default Students;