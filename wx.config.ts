import { defineConfig } from "./src/index";

export default defineConfig({
  appid: "appid",
  type: "miniProgram",
  projectPath: "./dist/build/mp-weixin",
  privateKeyPath: "./key/private.wxfcc8888888888888.key",
  packageJsonPath: "./package.json",
});
