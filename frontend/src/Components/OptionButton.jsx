export default function OptionButton({ option, selected, onSelect, disabled }) {
  const isSelected = selected === option;
  return (
    <button
      onClick={() => onSelect(option)}
      disabled={disabled}
      className={`py-4 px-6 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200 ${
        isSelected
          ? "bg-red-600 text-white shadow-red-500/50"
          : "bg-black/20 text-white hover:bg-black/30"
      }`}
    >
      Option {option}
    </button>
  );
}
