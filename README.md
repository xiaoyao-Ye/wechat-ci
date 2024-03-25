# wechat-ci

> `miniprogram-ci` 使用 pnpm 存在问题, 所以使用 `wechat-ci` 上传必须使用 npm 打包项目(yarn 没测试过)

通过命令行 上传/预览 微信小程序[基于 miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci)

## Features

- 简单配置高效使用, 拒绝繁琐配置项
- 测试叫你给一个测试二维码时, 直接命令行操作. 避免打开微信开发者工具导致的内存崩溃
- 统一编译配置, 避免每个人上传预览时配置项不同
- ...

- 简单配置高效使用, 拒绝繁琐配置项

## Usage

1. 安装

   ```bash
   npm i wechat-ci -D
   ```

2. 项目根目录创建并配置 `wx.config.js` 或 `wx.config.ts`

   ```ts
   import { defineConfig } from "wechat-ci";

   export default defineConfig({
     appid: "appid", // 小程序 appid
     type: "miniProgram", // 小程序类型
     projectPath: "./dist/build/mp-weixin", // 小程序项目路径
     // 私钥key路径, 私钥前往 微信公众平台登录-开发管理-开发设置-小程序代码上传-生成 小程序代码上传密钥(记得同时配置IP白名单)
     privateKeyPath: "./key/private.wxfcc8888888888888.key",
     packageJsonPath: "./package.json", // package.json 路径
     previewOptions: {
       // 预览配置
       qrcodeFormat: "image",
       qrcodeOutputDest: "./qrcode.jpg",
       pagePath: "", // 预览页面路径
       searchQuery: "", // 预览页面路径启动参数
       scene: "1011",
     },
     settings: {
       // 编译配置
       // 默认{ es6: true, es7: true, minify: true, autoPrefixWXSS: true, disableUseStrict: true, ignoreUploadUnusedFiles: true, };
     },
   });
   ```

3. 配置 package.json

   ```json
   "scripts": {
     // uniapp 需要先打包
     "ci": "uni build -p mp-weixin && weichat-ci",
     // 微信小程序原生直接使用
     "ci": "wechat-ci"
   }
   ```

4. 预览/发布

   ```bash
   npm run ci
   ```

   > 也可配合 release-it 这种工具使用, release-it after:bump 生命周期运行 `npm run ci`

## More

- [ ] 版本更新提示
- [ ] 选择 ci 机器人 1~30
- [ ] 根据 git commit 消息自动获取上传信息 `version + commit msg + author` 基于 `parse-git-config`
- [ ] 接入邮件/企业微信 直接将预览二维码发送给指定群或者指定人员? 支持可视化操作?
