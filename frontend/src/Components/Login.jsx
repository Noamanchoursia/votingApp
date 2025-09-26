import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Please enter a name");
    onLogin(username);
    navigate("/vote");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-800 relative">
      {/* Welcome Text */}
      <h1 className="absolute top-16 text-3xl sm:text-4xl font-bold text-white animate-[fadeIn_1s_ease-in] tracking-wide">
        Welcome To Voting Application
      </h1>

      {/* Login Card */}
      <div className="mt-40 bg-gradient-to-r from-gray-800 via-black to-red-700 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl p-6 w-[90%] max-w-lg text-center">
        <p className="text-gray-300 text-lg sm:text-base mb-6 font-medium text-center 
              bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent 
              animate-[fadeInUp_1s_ease-out]">
            Enter your name to continue and cast your vote
       </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-4 rounded-2xl bg-black/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-70"
          />
          <button
            type="submit"
            className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg transition-all duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
