import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement } from "chart.js"

ChartJS.register(CategoryScale,LinearScale,BarElement)


function StudentDashboard(){

    const cardStyle = {
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
textAlign:"center"
}

const { id } = useParams();
const [student,setStudent] = useState(null);
const [assignments,setAssignments] = useState([])
const [prediction,setPrediction] = useState(null)
const [weakTopics,setWeakTopics] = useState([])
const [attendance,setAttendance] = useState(0)
const [risk,setRisk] = useState("")

useEffect(() => {

API.get(`/students/${id}`)
.then(res=>{
setStudent(res.data);
});

API.get(`/assignments/student/${id}`)
.then(res=>{
setAssignments(res.data)
})

API.get("/assignments/insights")
.then(res=>{
setWeakTopics(res.data.weakTopics)
})

API.get(`/assignments/insights/student/${id}`)
.then(res=>{
setWeakTopics(res.data.weakTopics)
})

API.get(`/attendance/student/${id}`)
.then(res=>{

const percentage = res.data.attendance

setAttendance(percentage)

let riskLevel = "Safe"

if(percentage < 65){
riskLevel = "High Risk"
}
else if(percentage < 80){
riskLevel = "Warning"
}

setRisk(riskLevel)

})

},[id]);

const fetchPrediction = async () => {

if(assignments.length === 0) return

const avgScore =
assignments.reduce((sum,a)=>sum + a.score,0) / assignments.length

const res = await API.post("/assignments/predict",{
attendance,
assignmentScore: avgScore
})

setPrediction(res.data.predicted_score)

}
const chartData = {
labels: assignments.map(a=>a.topic),
datasets:[
{
label:"Score",
data: assignments.map(a=>a.score),
backgroundColor:"#3b82f6"
}
]
}
useEffect(()=>{

fetchPrediction()

},[fetchPrediction]);
if(!student){
return <p>Loading student data...</p>
}

return (

<StudentLayout studentId={id}>

<h1>Welcome {student.name}</h1>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginTop:"30px"
}}>

<div style={cardStyle}>
<h3>Assignments</h3>
<p>{assignments.length}</p>
</div>

<div style={cardStyle}>
<h3>Predicted Score</h3>
<p>{prediction ? `${prediction}/100` : "--"}</p>
</div>

<div style={cardStyle}>
<h3>Weak Topics</h3>
<p>{weakTopics.length}</p>
</div>

<div style={cardStyle}>
<h3>Attendance</h3>
<p>{attendance}%</p>
</div>

<div style={cardStyle}>

<h3>Attendance Risk</h3>

<p style={{
color:
risk === "High Risk" ? "red" :
risk === "Warning" ? "orange" :
"green"
}}>
{risk}
</p>

</div>

</div>

<h2 style={{marginTop:"40px"}}>Performance</h2>

<Bar data={chartData}/>
</StudentLayout>


)

}

export default StudentDashboard;