# pubdoc — 資料をパスで配る静的サーバ

勉強会スライドやドキュメントを、プロジェクトごとのパスに置いて配るための nginx。
**`/public` はログイン不要、それ以外は要ログイン**。

```
https://pubdoc.unlaxer.org/public/<project>/...    ← 誰でも開ける
https://pubdoc.unlaxer.org/private/<project>/...   ← MEMBER 以上
```

## ディレクトリ構成

```
docs/
├── index.html                  トップ（public / private への入口）
├── public/
│   └── index.html              公開資料の一覧
└── private/
    ├── index.html              非公開資料の一覧
    └── address-lore/
        └── address-lore-study-session.html
```

`docs/` がそのまま公開ルート。**階層を新しく作ったら `index.html` も置く**
（ディレクトリ一覧を出さない設定なので、無いと 403 になる）。

## 資料を追加する

```bash
# 公開してよいもの
cp ~/slide.html docs/public/myproject/
# 社内向け・非公開 repo 由来のもの
cp ~/slide.html docs/private/myproject/

git add docs/ && git commit -m "add: myproject slide" && git push
```

`docs/` は nginx に read-only マウントしているので、**コミットした時点で反映**される
（コンテナの再起動もデプロイも不要）。

## ローカルで確認

```bash
docker compose up -d --build
curl -I http://localhost:8795/public/
```

## 認証の仕組み

ルート全体は `minRole: MEMBER`、`/public` だけ volta-gateway の
[`auth_rules`](https://github.com/opaopa6969/volta-gateway) で認証を外している。

```yaml
# prod: /home/opa/volta-gateway/volta-gateway.yaml
- host: pubdoc.unlaxer.org
  backend: http://192.168.1.8:8795
  min_role: MEMBER
  auth_rules:
  - prefix: /public
    auth: public
```

`volta.service.json` にも同じ `auth_rules` を宣言してある。これが `svc_add` 経由で
効くのは **prod の volta-platform が volta-platform#133 以降に更新されてから**。
それまでは上記の yaml が実効値（generator は未宣言扱いで手編集値を温存する）。

## 注意

- **ホスト側ポートは 8795**。`:80` は volta-gateway 自身なので使えない
  （割り当てると gateway を壊すか、ルートが自己ループして 400 になる）
- スライドの元 Markdown は各プロジェクト側に置く。ここは配信物だけ
  （例: address-lore は `~/work/address-lore/docs/*.md` → `npm run build:slide`）
