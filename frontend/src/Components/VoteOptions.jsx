import OptionButton from "./OptionButton";

export default function VoteOptions({ options, selectedOption, onSelectOption, disabled }) {
  return (
    <div className="flex gap-4 flex-wrap justify-center mt-2">
      {options.map((opt) => (
        <OptionButton
          key={opt}
          option={opt}
          selected={selectedOption}
          onSelect={onSelectOption}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
