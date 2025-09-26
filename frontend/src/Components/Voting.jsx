import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VoteOptions from "./VoteOptions";
import SubmitVote from "./SubmitVote";

const API_URL = "http://localhost:5000/api/votes";

export default function Voting({ username }) {
  const [choice, setChoice] = useState("");
  const navigate = useNavigate();

  const handleVote = async () => {
    if (!choice) {
      alert("Please select an option to vote.");
      return;
    }
    try {
      await axios.post(API_URL, { username, choice });
      sessionStorage.setItem("hasVoted", "true");
      alert("✅ Vote recorded!");
      navigate("/results");
    } catch (err) {
      console.error("Vote Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Voting failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-800 p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-[fadeIn_1s_ease-in]">
        Cast Your Vote
      </h1>

      <div className="bg-gradient-to-r from-gray-800 via-black to-red-700 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl p-6 w-[90%] max-w-lg text-center mb-5">
        <p className="text-gray-200 text-lg mb-4">Choose one of the options below:</p>

        <VoteOptions
          options={["A", "B", "C"]}
          selectedOption={choice}
          onSelectOption={setChoice}
          disabled={false}
        />

        <div className="mt-5">
          <SubmitVote onSubmit={handleVote} disabled={!choice} />
        </div>
      </div>
    </div>
  );
}
