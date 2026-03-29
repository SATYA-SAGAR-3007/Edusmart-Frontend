import React,{useState} from "react"
import API from "../services/api"
import {useNavigate} from "react-router-dom"

function TeacherSignup(){

const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
username:"",
password:""
})

const handleChange = e =>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSignup = async ()=>{

if(!form.name || !form.email || !form.username || !form.password){
alert("Please fill all fields")
return
}

try{

await API.post("/auth/teacher-signup",form)

alert("Teacher registered successfully")

navigate("/teacher-login")

}
catch(err){

alert(err.response.data.message)

}

}

return(

<div>

<h2>Teacher Signup</h2>

<input name="name" placeholder="Name" onChange={handleChange}/>
<br/>

<input name="email" placeholder="Email" onChange={handleChange}/>
<br/>

<input name="username" placeholder="Username" onChange={handleChange}/>
<br/>

<input name="password" type="password" placeholder="Password" onChange={handleChange}/>
<br/>

<button onClick={handleSignup}>
Signup
</button>

</div>

)

}

export default TeacherSignup