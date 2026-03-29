import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentLogin(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleLogin = async () => {

try{

const res = await API.post("/auth/student-login",{
email,
password
})

if(res.data.message==="Login successful"){


localStorage.setItem("token",res.data.token)
localStorage.setItem("userRole","student")
localStorage.setItem("student",JSON.stringify(res.data.student))

navigate(`/student-dashboard/${res.data.student.id}`)

}

}catch(err){

alert("Invalid login")

}

}

return(

<div style={{textAlign:"center",marginTop:"120px"}}>

<h2>Student Login</h2>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={handleLogin}>
Login
</button>

</div>

)

}

export default StudentLogin