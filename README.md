# ENTRY 勤怠管理システム

## セットアップ

1. .env.sampleをコピーして.envを作成
2. docker compose up -d
3. docker exec -it {コンテナ名} bash
4. `npm install`
5. Prisma初期化
`npx prisma generate`
6. マイグレーション
`npx prisma migrate dev`
7. シード投入
`npm run seed`


## 起動
1. `docker exec -it {コンテナ名} bash`
2. `npm run dev`


## Dockerについて
### ローカル接続用の開放ポート
- APP : 3000番
- DB: 3306番