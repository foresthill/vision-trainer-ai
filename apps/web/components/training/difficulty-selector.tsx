'use client';

interface DifficultySelectorProps {
  difficulty: number;
  onChange: (difficulty: number) => void;
  disabled?: boolean;
}

export function DifficultySelector({
  difficulty,
  onChange,
  disabled,
}: DifficultySelectorProps) {
  const getDifficultyLabel = (d: number) => {
    if (d <= 3) return '初級';
    if (d <= 6) return '中級';
    if (d <= 8) return '上級';
    return 'エキスパート';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm font-medium">
        難易度: {difficulty} ({getDifficultyLabel(difficulty)})
      </label>
      <input
        type="range"
        min="1"
        max="10"
        value={difficulty}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-64"
      />
      <div className="flex justify-between w-64 text-xs text-gray-500">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
}
