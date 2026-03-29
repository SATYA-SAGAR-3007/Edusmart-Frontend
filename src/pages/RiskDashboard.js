import React, { useEffect, useState } from "react";
import API from "../services/api";

function RiskDashboard() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchRiskStudents();
  }, []);

  const fetchRiskStudents = async () => {
    const res = await API.get("/attendance/risk");
    setStudents(res.data);
  };

  return (

    <div>

      <h2>Student Risk Detection</h2>

      <table style={{width:"100%", background:"white"}}>

        <thead>
          <tr>
            <th>Student ID</th>
            <th>Attendance %</th>
            <th>Risk Level</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s, index) => (

            <tr key={index}>

              <td>{s.student_id}</td>

              <td>{Math.round(s.attendance)}%</td>

              <td>{s.risk}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RiskDashboard;