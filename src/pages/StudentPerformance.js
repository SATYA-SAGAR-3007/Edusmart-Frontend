import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

function StudentPerformance(){

const { id } = useParams();
const [assignments,setAssignments] = useState([]);

useEffect(()=>{

API.get(`/assignments/student/${id}`)
.then(res=>{
setAssignments(res.data);
});

},[id]);

return(

<StudentLayout studentId={id}>

<h1>Performance</h1>

<ul>

{assignments.map((a,i)=>(
<li key={i}>
{a.topic} : {a.score}
</li>
))}

</ul>

</StudentLayout>

);

}

export default StudentPerformance;