# wechat-ci

微信小程序 上传代码/预览, 命令行 上传/预览 微信小程序
[基于 miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci)

## use

1. 安装

```bash
npm i wechat-ci -D
```

2. 配置 wx.config.js

> 版本 1.0.0 发布后将使用 `wx.config.ts` 配置文件.

version 1.0.0

```ts
import { defineConfig } from 'wechat-ci'
// you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:
export default defineConfig({
  // ...
  // 路径相关配置都是基于 node.js 进程的当前工作目录
})
```

version 0.2.6

```js
// wx.config.js 配置
export default {
  // 小程序appid
  appid: 'xxxx',
  // 上传的项目路径
  projectPath: 'project/dist/build/mp-weixin',
  // package.json路径
  packageJsonPath: 'project/package.json',
  // 私钥key路径
  privateKeyPath: 'project/key/private.wxfcc8888888888888.key',
  // 小程序
  type: 'miniProgram',

  // 预览:
  previewOptions: {
    // 返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用
    // 'image' | 'base64' | 'terminal' | undefined
    qrcodeFormat: 'image',
    // 二维码文件保存路径, required when qrcodeFormat is "image"
    qrcodeOutputDest: './qrcode.jpg',
    // 预览页面路径
    // pagePath: '',
    // 预览页面路径启动参数
    // searchQuery: '',
    // 默认值 1011，具体含义见场景值列表
    // scene: '1011',
  },

  // 配置 > 自动获取project.config.json > 默认{ es6: true, es7: true, minify: true, ignoreUploadUnusedFiles: true }
  settings: {},
}
```

3. 配置 package.json

```json
"scripts": {
  "ci": "uni build -p mp-weixin && weichat-ci",
}
```

4. 预览/发布

可配合 release-it 使用, release-it after:bump 生命周期运行 `npm run ci`

```bash
npm run ci
```

## 后续可能扩展

- [ ] 版本更新提示
- [ ] 选择 ci 机器人 1~30
- [ ] 根据 git commit 消息自动获取上传信息`version + commit msg + author` 基于`parse-git-config`
- [ ] 接入邮件/企业微信? 支持可视化操作?
