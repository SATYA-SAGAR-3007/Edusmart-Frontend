import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function TeacherLogin() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/teacher-login",{
        username,
        password
      });

      if(res.data.message === "Login successful"){
        localStorage.setItem("token",res.data.token)
localStorage.setItem("userRole","teacher")
localStorage.setItem("teacher",JSON.stringify(res.data.teacher))

navigate("/teacher-dashboard")
      }

    } catch(err){

      alert("Invalid login");

    }

  };

  return (

    <div style={{textAlign:"center",marginTop:"120px"}}>

      <h2>Teacher Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
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

  );

}

export default TeacherLogin;