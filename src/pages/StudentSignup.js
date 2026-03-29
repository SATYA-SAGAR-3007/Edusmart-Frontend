import React,{useState} from "react"
import API from "../services/api"
import {useNavigate} from "react-router-dom"

function StudentSignup(){

const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
password:"",
department:"",
year:""
})

const handleChange = e =>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSignup = async ()=>{

if(!form.name || !form.email || !form.password || !form.department || !form.year){
alert("Please fill all fields")
return
}

try{

await API.post("/auth/student-signup",form)

alert("Student registered successfully")

navigate("/student-login")

}
catch(err){

alert(err.response.data.message)

}

}

return(

<div>

<h2>Student Signup</h2>

<input name="name" placeholder="Name" onChange={handleChange}/>
<br/>

<input name="email" placeholder="Email" onChange={handleChange}/>
<br/>

<input name="password" type="password" placeholder="Password" onChange={handleChange}/>
<br/>

<input name="department" placeholder="Department" onChange={handleChange}/>
<br/>

<input name="year" placeholder="Year" onChange={handleChange}/>
<br/>

<button onClick={handleSignup}>
Signup
</button>

</div>

)

}

export default StudentSignup