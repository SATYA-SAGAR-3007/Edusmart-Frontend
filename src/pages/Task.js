import React, {useEffect, useState} from "react"
import API from "../services/api"

function Tasks(){

const [tasks,setTasks]=useState([])

useEffect(()=>{
fetchTasks()
},[])

const fetchTasks = async ()=>{
const res = await API.get("/tasks")
setTasks(res.data)
}

return(

<div>

<h2>Teacher Tasks</h2>

<ul>
{tasks.map(t=>(
<li key={t.id}>
{t.title} - {t.status}
</li>
))}
</ul>

</div>

)

}

export default Tasks