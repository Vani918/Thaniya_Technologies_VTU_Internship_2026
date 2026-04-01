import { useState } from "react";
import axios from "axios";

function App() {
const [username, setUsername] = useState("");
const [result, setResult] = useState(null);

const handleSubmit = async () => {
const res = await axios.post("http://localhost:5000/api/evaluate", {
username
});
setResult(res.data);
};

return (

<div style={{ textAlign: "center", marginTop: "50px" }}>  
<h2>Developer Portfolio Evaluator</h2>  <input
type="text"
placeholder="Enter GitHub Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>

<button onClick={handleSubmit}>Evaluate</button>

{result && (
<div>
<h3>Score: {result.score}</h3>
<p>Repos: {result.repoCount}</p>
</div>
)}

</div>  );
}

export default App;
