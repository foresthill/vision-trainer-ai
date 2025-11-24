'use client';

export function AchievementBadges() {
  const achievements = [
    {
      id: 'first-session',
      name: '初めの一歩',
      description: '最初のトレーニングを完了',
      earned: true,
    },
    {
      id: 'streak-7',
      name: '一週間の習慣',
      description: '7日連続でトレーニング',
      earned: true,
    },
    {
      id: 'streak-30',
      name: '継続の達人',
      description: '30日連続でトレーニング',
      earned: false,
    },
    {
      id: 'parallel-master',
      name: 'パラレル視マスター',
      description: 'パラレル視でレベル10に到達',
      earned: false,
    },
    {
      id: 'cross-master',
      name: 'クロス視マスター',
      description: 'クロス視でレベル10に到達',
      earned: false,
    },
    {
      id: 'sessions-100',
      name: '熟練者',
      description: '100回のセッションを完了',
      earned: false,
    },
  ];

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">実績</h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`rounded-lg border p-4 ${
              achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'opacity-50'
            }`}
          >
            <div className="font-medium">{achievement.name}</div>
            <div className="text-sm text-gray-500">{achievement.description}</div>
            {achievement.earned && (
              <div className="mt-2 text-xs text-yellow-600">獲得済み</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
