# VisionTrainer - 視力回復トレーニングアプリ

パラレル視・クロス視の立体視画像を自動生成し、視力回復トレーニングを提供するアプリケーション。

## 特徴

- **立体視画像生成**: ランダムドット、ライン、テクスチャパターンをサポート
- **2つのトレーニングモード**: パラレル視とクロス視
- **難易度自動調整**: 成功率に応じて難易度を調整
- **進捗管理**: カレンダーヒートマップ、統計ダッシュボード、実績バッジ

## プロジェクト構造

```
vision-trainer/
├── apps/
│   ├── web/          # Next.js 15 Web版
│   └── mobile/       # Expo（将来実装）
├── packages/
│   ├── vision-core/  # 画像生成・トレーニングロジック
│   ├── shared-types/ # 共有型定義
│   └── ui-components/ # 共有UIコンポーネント
└── docs/             # ドキュメント
```

## 技術スタック

- **Monorepo**: Turborepo + pnpm
- **Web**: Next.js 15, React 19, Tailwind CSS v4
- **Database**: PostgreSQL + Prisma 6
- **State**: Zustand

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp apps/web/.env.example apps/web/.env.local
# DATABASE_URL などを設定

# Prismaクライアント生成
pnpm db:generate

# データベースマイグレーション
pnpm db:push

# 開発サーバー起動
pnpm dev
```

## 環境変数

`apps/web/.env.local`:

```
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
```

## スクリプト

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - 本番ビルド
- `pnpm db:generate` - Prismaクライアント生成
- `pnpm db:push` - データベーススキーマ同期

## ライセンス

MIT
