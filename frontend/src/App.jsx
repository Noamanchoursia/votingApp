import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import Voting from "./Components/Voting";
import Results from "./Components/Result";

export default function App() {
  const [username, setUsername] = useState("");

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUsername} />} />
      <Route path="/vote" element={<Voting username={username} />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<Login onLogin={setUsername} />} /> {/* default to login */}
    </Routes>
  );
}
