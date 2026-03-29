import React, {useState, useEffect} from "react";
import API from "../services/api";
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement)

function Dashboard() {
    const [stats, setStats] = useState({});
    const [weakTopics, setWeakTopics] = useState([]);

  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "200px"
  };
  const cardStyle2 = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "400px",
    marginTop : "10px"
  };
  const chartData = {
labels:["Assignments","Attendance"],
datasets:[
{
label:"Activity",
data:[stats.totalAssignments,stats.totalAttendance],
backgroundColor:["#3b82f6","#10b981"]
}
]
}
  useEffect(() => {
  API.get("/dashboard/stats").then(res => {
    setStats(res.data);
  });
  API.get("/assignments/insights").then(res=>{
    setWeakTopics(res.data.weakTopics);
  });

}, []);

  return (

<div>

<h1 style={{marginBottom:"30px"}}>EduSmart Dashboard</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}}>

<div style={cardStyle}>
<h3>Total Students</h3>
<p style={{fontSize:"24px"}}>{stats.totalStudents}</p>
</div>

<div style={cardStyle}>
<h3>Assignments</h3>
<p style={{fontSize:"24px"}}>{stats.totalAssignments}</p>
</div>

<div style={cardStyle}>
<h3>Attendance Records</h3>
<p style={{fontSize:"24px"}}>{stats.totalAttendance}</p>
</div>

<div style={cardStyle}>
<h3>⚠ Weak Topics</h3>

{weakTopics.length === 0 ? (
<p>No weak topics</p>
) : (
<ul>
{weakTopics.map((topic,index)=>(
<li key={index}>{topic}</li>
))}
</ul>
)}


</div>

</div>
<div style={cardStyle2}>
    <h2 style={{marginTop:"40px"}}>Platform Activity</h2>

<Bar data={chartData}/>

</div>
</div>

)
}

export default Dashboard;