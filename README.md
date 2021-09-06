# TapTap friend landing page

## 修改游戏信息

游戏信息保存在 .env 文件中。

| key            | desc       |
| -------------- | ---------- |
| VITE_TITLE     | 网页标题   |
| VITE_GAME_NAME | 游戏名称   |
| VITE_GAME_DESC | 游戏描述   |
| VITE_GAME_URL  | 二维码链接 |

## 部署

构建

```sh
npm run build
```

进入 dist 目录

```sh
cd dist
```

切换 LeanCloud 应用

```sh
lean switch
```

部署

```sh
lean deploy
```
