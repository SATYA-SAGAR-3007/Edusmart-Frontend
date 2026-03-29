import React, { useEffect, useState } from "react";
import API from "../services/api";

function AIInsights() {

  const [insights, setInsights] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {

    const res = await API.get("/assignments/insights");

    setInsights(res.data.insights);
    setWeakTopics(res.data.weakTopics);

  };

  return (
    <div>

      <h2>AI Insights</h2>

      <h3>Topic Performance</h3>

      <ul>
        {insights.map((i, index) => (
          <li key={index}>
            {i.topic} - {i.level} ({Math.round(i.percentage)}%)
          </li>
        ))}
      </ul>

      <h3>Weak Topics</h3>

      <ul>
        {weakTopics.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>

    </div>
  );
}

export default AIInsights;