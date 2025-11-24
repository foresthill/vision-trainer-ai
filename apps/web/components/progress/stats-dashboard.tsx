'use client';

export function StatsDashboard() {
  // Sample stats
  const stats = {
    totalSessions: 42,
    successRate: 78,
    averageDuration: 45,
    currentStreak: 7,
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">総セッション数</div>
        <div className="text-2xl font-bold">{stats.totalSessions}</div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">成功率</div>
        <div className="text-2xl font-bold">{stats.successRate}%</div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">平均時間</div>
        <div className="text-2xl font-bold">{stats.averageDuration}秒</div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">連続記録</div>
        <div className="text-2xl font-bold">{stats.currentStreak}日</div>
      </div>
    </div>
  );
}
