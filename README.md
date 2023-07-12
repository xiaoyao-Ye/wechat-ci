# wechat-ci

微信小程序 上传代码/预览, 命令行 上传/预览 微信小程序
[基于 miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci)

## Usage

1. 安装

   ```bash
   npm i wechat-ci -D
   ```

2. 配置 `wx.config.js` 或 `wx.config.ts`

   ```ts
   import { defineConfig } from "wechat-ci";
   // you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:
   // 路径相关配置都是基于 node.js 进程的当前工作目录
   export default defineConfig({
     // 小程序 appid
     appid: "appid",
     // 小程序类型
     type: "miniProgram",
     // 小程序项目路径
     projectPath: "./dist/build/mp-weixin",
     // 私钥key路径, 私钥前往 微信公众平台登录-开发管理-开发设置-小程序代码上传-生成 小程序代码上传密钥(记得同时配置IP白名单)
     privateKeyPath: "./key/private.wxfcc8888888888888.key",
     // package.json 路径
     packageJsonPath: "./package.json",
     // 预览:
     previewOptions: {
       // 返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用
       // 'image' | 'base64' | 'terminal' | undefined
       qrcodeFormat: "image",
       // 二维码文件保存路径, required when qrcodeFormat is "image"
       qrcodeOutputDest: "./qrcode.jpg",
       // 预览页面路径
       // pagePath: '',
       // 预览页面路径启动参数
       // searchQuery: '',
       // 默认值 1011，具体含义见场景值列表
       // scene: '1011',
     },
     // 编译配置 > 默认{ es6: true, es7: true, minify: true, autoPrefixWXSS: true, disableUseStrict: true, ignoreUploadUnusedFiles: true, };
     settings: {},
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

   > 可配合 release-it 使用, release-it after:bump 生命周期运行 `npm run ci`

   ```bash
   npm run ci
   ```

## More

- [ ] 版本更新提示
- [ ] 选择 ci 机器人 1~30
- [ ] 根据 git commit 消息自动获取上传信息`version + commit msg + author` 基于`parse-git-config`
- [ ] 接入邮件/企业微信 直接将预览二维码发送给指定群或者指定人员? 支持可视化操作?
