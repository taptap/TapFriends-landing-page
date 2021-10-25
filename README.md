# TapTap friend landing page

## 修改游戏信息

游戏信息保存在 .env 文件中。

| key                | desc               | i18n key           |
| ------------------ | ------------------ | ------------------ |
| DOCUMENT_TITLE     | 网页标题           | `document.title`   |
| GAME_ICON          | 游戏图标           | -                  |
| GAME_NAME          | 游戏名称           | `game.name`        |
| GAME_DESC          | 游戏描述           | `game.description` |
| GAME_URL           | 二维码链接         | -                  |
| GAME_IOS_LINK      | IOS app link       | -                  |
| GAME_IOS_STORE     | IOS store link     | -                  |
| GAME_ANDROID_LINK  | Android app link   | -                  |
| GAME_ANDROID_STORE | Android store link | -                  |

游戏图标保存在 public/game_icon.png 中。

### 多语言

可为支持 i18n key 的游戏信息添加多语言配置，在指定语言环境中替换 .env 文件中的值。

多语言配置保存在 `src/i18n/locales/{locale}.json` 中。

## 部署

构建

```sh
npm run build
```

进入 dist 目录

```sh
cd dist
```

如果之前没有开启云引擎服务和安装 tds 命令行工具，请在控制台开启云引擎服务，并参考文档说明[安装命令行工具][install]并[登录账户][login]。

[install]: https://developer.taptap.com/docs/sdk/engine/guide/cli/#%E5%AE%89%E8%A3%85%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7
[login]: https://developer.taptap.com/docs/sdk/engine/guide/cli/#安装命令行工具

关联应用：

```sh
tds switch
```

部署

```sh
tds deploy
```

详见云引擎文档的[部署][deploy]和[发布][publish]章节。

[deploy]: https://developer.taptap.com/docs/sdk/engine/guide/cli/#%E9%83%A8%E7%BD%B2
[publish]: https://developer.taptap.com/docs/sdk/engine/guide/cli/#%E5%8F%91%E5%B8%83%E5%88%B0%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83
