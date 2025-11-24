'use client';

export function CalendarHeatmap() {
  // Generate sample data for the last 90 days
  const days = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5),
    };
  });

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-green-200';
    if (count === 2) return 'bg-green-300';
    if (count === 3) return 'bg-green-400';
    return 'bg-green-500';
  };

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">トレーニング履歴</h2>

      <div className="flex flex-wrap gap-1">
        {days.map((day) => (
          <div
            key={day.date}
            className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
            title={`${day.date}: ${day.count} sessions`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span>少</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100" />
        <div className="w-3 h-3 rounded-sm bg-green-200" />
        <div className="w-3 h-3 rounded-sm bg-green-300" />
        <div className="w-3 h-3 rounded-sm bg-green-400" />
        <div className="w-3 h-3 rounded-sm bg-green-500" />
        <span>多</span>
      </div>
    </div>
  );
}
