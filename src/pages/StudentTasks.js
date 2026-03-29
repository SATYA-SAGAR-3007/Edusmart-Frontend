import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

function StudentTasks() {

  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    API.get(`/tasks/student/${id}`)
      .then(res => {
        setTasks(res.data);
      });

  }, [id]);

  return (

    <StudentLayout studentId={id}>

      <h1>My Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.task}
            </li>
          ))}
        </ul>
      )}

    </StudentLayout>

  );

}

export default StudentTasks;