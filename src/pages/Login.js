import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const spacing = {
    margin: "10px"
  };

  useEffect(() => {

    const role = localStorage.getItem("userRole");

    if (role === "teacher") {
      navigate("/teacher-dashboard");
    }

    if (role === "student") {

      const studentData = localStorage.getItem("student");

      if (studentData) {
        const student = JSON.parse(studentData);
        if (student?.id) {
          navigate(`/student-dashboard/${student.id}`);
        }
      }

    }

  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>EduSmart Login / SignUp</h1>

      <button style={spacing} onClick={() => navigate("/teacher-login")}>
        Teacher Login
      </button>

      <button style={spacing} onClick={() => navigate("/teacher-signup")}>
        Teacher Signup
      </button>

      <br /><br />

      <button style={spacing} onClick={() => navigate("/student-login")}>
        Student Login
      </button>

      <button style={spacing} onClick={() => navigate("/student-signup")}>
        Student Signup
      </button>

    </div>
  );
}

export default Login;