# saucedemo-e2e

Playwright による [saucedemo.com](https://www.saucedemo.com/) の E2E テスト。
Page Object パターン、storageState による認証の共有、GitHub Actions での CI を含む。

[![E2E Tests](https://github.com/nyabigaile/saucedemo-e2e/actions/workflows/e2e.yml/badge.svg)](https://github.com/nyabigaile/saucedemo-e2e/actions/workflows/e2e.yml)

## 技術スタック

- Playwright / TypeScript
- Node.js 24
- GitHub Actions（CI）
- ESLint / tsc --noEmit（静的解析）

## セットアップ

```bash
npm ci
npx playwright install --with-deps chromium
```

## 実行

```bash
npm test              # 全テスト実行
npm run test:ui       # UI モードで実行
npm run lint          # Lint
npm run typecheck     # 型チェック
```

## ディレクトリ構成

| パス | 役割 |
|---|---|
| `tests/` | テストシナリオ（`*.spec.ts`）と認証セットアップ |
| `pages/` | Page Object |
| `.github/workflows/` | CI 定義 |

## テスト一覧

| ファイル | 検証内容 |
|---|---|
| cart.spec.ts | 商品一覧からカートに追加 / カート画面で表示されるか確認 |
| inventory.spec.ts | 商品一覧の表示確認。商品名とその順番と個数を確認 |
| login.spec.ts | 正常系ログイン / ロックされたユーザーのエラー表示 |
| logout.spec.ts | ログアウト / ログアウト後、ブラウザ操作で戻った際のアクセス制限 |

## 設計判断

### 認証を storageState で共有している

今回のテストではログインしなければログイン画面以外を確認できないため、テストの度にログインする必要があった。  
この状態は無駄に実行時間を増やし、仮にログインに問題があればテストの本題に入れないため、省略することが望ましいと判断した。  
しかし、ログイン自体の検証が必要な場合は通常通りログインしている。

### Locator は data-test 属性を優先している

saucedemoではdata-testが付与されているため、これを優先しているが一部例外はある。  
XPATHやCSSなど、変更可能性の高いとみられるものは極力排除するように記述している。


### 画面の判定には固定要素を使う

画面遷移の確認として、ヘッダーのタイトルを確認することとした。  
仮に画面全体を検索対象としてしまうと、「Products」という商品が存在することを想定すると「商品一覧」画面に正しく遷移されたということが担保されない。

### 1つのテストで1つのことだけ検証する

このテストを開始した時点では、ログイン時に商品個数や商品名を同じテストで確認していたが、テストが落ちた理由を明確にするために一つのテストで複数の確認はしないようにした。

### 認証情報について
環境変数 `TEST_USER` / `TEST_PASSWORD` 設定している場合はこれらを優先する。  
本来なら公開情報とすべきではないが、今回使用しているsaucedemoは情報を公開しているためデフォルト値としている。

### 静的解析で事故を機械的に防ぐ
人間の注意力や根気に頼らなくても事故を発生させないようにしたい。  
そのため、Lintとtypecheckを行う必要がある。テストは時間がかかるため、先に実行する。


---

## 既知の挙動

### /inventory.html へのリクエストが 404 を返す
'/inventory.html'にアクセスすると404になり、'/'でもリダイレクトはしなかった。  
画面の表示と操作が目的であり、これを解決しなくても事実上の問題はないと判断した。
この現象の原因については不明。

---

## 今後の課題
- 複数ブラウザでのテスト実行
- テストのシャード分割
- ビジュアルリグレッションテスト(スクリーンショットの比較)
- 自作アプリでの検証
