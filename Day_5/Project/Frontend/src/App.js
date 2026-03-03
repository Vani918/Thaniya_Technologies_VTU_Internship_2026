import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>React + Express + Node</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;
