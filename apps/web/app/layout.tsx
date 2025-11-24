import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VisionTrainer - 視力回復トレーニング',
  description: 'パラレル視・クロス視の立体視画像で視力回復トレーニング',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-14 items-center">
              <a href="/" className="flex items-center space-x-2">
                <span className="font-bold">VisionTrainer</span>
              </a>
              <nav className="ml-auto flex items-center space-x-4">
                <a href="/training/parallel" className="text-sm font-medium hover:underline">
                  パラレル視
                </a>
                <a href="/training/cross" className="text-sm font-medium hover:underline">
                  クロス視
                </a>
                <a href="/generate" className="text-sm font-medium hover:underline">
                  画像生成
                </a>
                <a href="/progress" className="text-sm font-medium hover:underline">
                  進捗
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
