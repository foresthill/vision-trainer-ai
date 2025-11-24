# アーキテクチャ

## モノレポ構造

Turborepoを使用したモノレポ構成で、パッケージ間の依存関係を管理。

```
@repo/web
  └── @repo/ui-components
       └── @repo/vision-core
            └── @repo/shared-types
```

## パッケージ

### @repo/shared-types
型定義のみを含む軽量パッケージ。全パッケージで共有。

### @repo/vision-core
ビジネスロジック（画像生成、セッション管理、進捗計算）。
プラットフォーム非依存で、Web/Mobileで共有可能。

### @repo/ui-components
Reactコンポーネント。React Nativeへの移植を考慮した設計。

### @repo/web
Next.js 15アプリケーション。App Routerを使用。

## データフロー

1. ユーザーがトレーニングを開始
2. `vision-core`が深度マップとステレオグラムを生成
3. Canvasに描画
4. タイマー完了後、セッション結果をAPI経由でDBに保存
5. `zustand`ストアとDBの両方で状態を管理
