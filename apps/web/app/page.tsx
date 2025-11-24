export default function HomePage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          VisionTrainer
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          パラレル視・クロス視の立体視画像で視力回復トレーニング
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href="/training/parallel"
            className="rounded-lg border p-6 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">パラレル視</h2>
            <p className="mt-2 text-sm text-gray-500">
              画像の奥を見るように焦点を合わせるトレーニング
            </p>
          </a>

          <a
            href="/training/cross"
            className="rounded-lg border p-6 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">クロス視</h2>
            <p className="mt-2 text-sm text-gray-500">
              寄り目で手前に焦点を合わせるトレーニング
            </p>
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="/generate"
            className="rounded-lg border p-6 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">画像生成ツール</h2>
            <p className="mt-2 text-sm text-gray-500">
              カスタム立体視画像を生成
            </p>
          </a>

          <a
            href="/progress"
            className="rounded-lg border p-6 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">進捗管理</h2>
            <p className="mt-2 text-sm text-gray-500">
              トレーニング履歴と統計を確認
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
