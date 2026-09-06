# pubdoc — 公開ドキュメント共有

複数プロジェクトのスライド・HTML をパス分けでホストする静的ファイルサーバ。

## 構成

```
docs/
├── address-lore/           ← address-lore 勉強会スライド等
│   └── address-lore-study-session.html
├── other-project/          ← 別プロジェクトのドキュメント
│   └── slide.html
└── index.html              ← ルート（オプション）
```

## 使い方

### 1. ドキュメントを追加

```bash
# 例：address-lore のスライド
cp ~/work/address-lore/docs/address-lore-study-session.html docs/address-lore/

# git で管理
git add docs/address-lore/
git commit -m "add: address-lore study session slide"
git push origin master
```

### 2. アクセス

```
https://pubdoc.unlaxer.org/address-lore/address-lore-study-session.html
```

### 3. ディレクトリ構成の例

```
docs/
├── address-lore/
│   ├── address-lore-study-session.html     ← 40分勉強会
│   └── README.md
├── kamishibai/
│   └── slide.html
├── wavepp/
│   └── tutorial.html
└── index.html
```

## デプロイ

```bash
# docker でローカル確認
docker-compose up --build

# volta に登録（volta-platform で手動設定）
# または CI/CD で自動デプロイ
```

## 仕様

- **サーバ**: nginx (Alpine)
- **ポート**: 80 (HTTP)
- **ホスト**: pubdoc.unlaxer.org
- **ルートディレクトリ**: docs/
- **インデックス**: index.html（自動）

## ライフサイクル

- docs/ に新しいファイルを置く
- `git push` で更新
- nginx は docs/ をマウント（`-v ./docs:/usr/share/nginx/html:ro`）
- 即座に反映（再デプロイ不要）

## 将来の拡張

- index.html で全ドキュメント一覧を動的生成
- プロジェクト別フィード
- 検索機能
- アクセスログ

---

**管理者**: opa@caulis.jp
