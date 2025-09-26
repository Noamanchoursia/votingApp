export default function SubmitVote({ onSubmit, disabled }) {
  return (
    <button
      onClick={onSubmit}
      disabled={disabled}
      className={`w-full py-4 text-lg font-bold rounded-2xl shadow-xl text-white transition-all duration-200 ${
        disabled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
      }`}
    >
      Submit Vote
    </button>
  );
}
