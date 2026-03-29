import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";

function StudentInsights() {

  const { id } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {

    API.get(`/assignments/insights/student/${id}`)
      .then(res => {
        setTopics(res.data.weakTopics);
      });

  }, [id]);

  return (

    <StudentLayout studentId={id}>

      <h1>AI Insights</h1>

      {topics.length === 0 ? (
        <p>No weak topics detected</p>
      ) : (
        <ul>
          {topics.map((topic,index)=>(
            <li key={index}>
              Focus on: {topic}
            </li>
          ))}
        </ul>
      )}

    </StudentLayout>

  );

}

export default StudentInsights;