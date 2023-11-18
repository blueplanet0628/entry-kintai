# ENTRY 勤怠管理システム

## セットアップ

1. `npm install`
2. .env.sampleをコピーして.envを作成
3. docker compose up -d
4. docker exec -it {コンテナ名} bash
5. Prisma初期化
`npx prisma generate`
6. マイグレーション
`npx prisma migrate dev --name init`


## 起動
1. docker exec -it {コンテナ名} bash
2. npm run dev


# Dockerについて
## ローカル接続用の開放ポート
- APP : 3000番
- DB: 3306番