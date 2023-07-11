import { UserConfigExport, UserConfig } from "./config";
import { resolve, tryRequire } from "./index";
// import { consola } from "consola";

const loadEnv = async () => {
  try {
    const apiConfig: UserConfigExport = (await tryRequire(resolve("./wx.config")))?.default;
    return typeof apiConfig === "function" ? apiConfig() : apiConfig;
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND") {
      throw new Error(
        `请在项目根目录创建并配置 wx.config.ts 或 wx.config.js 文件. 参考: https://github.com/xiaoyao-Ye/wechat-ci`,
      );
    }
    throw new Error(`读取 wx.config 失败: ${error}`);
  }
};

const validator = (options: UserConfig): UserConfig => {
  if (Object.keys(options).length === 0) throw new Error("未读取到 wx.config 具体配置项, 请检查配置文件是否正确!");

  const requiredRule = ["projectPath", "type", "appid", "privateKeyPath", "packageJsonPath"];
  const errorKeys = requiredRule.filter(key => !options[key as keyof typeof options]);
  if (options?.previewOptions?.qrcodeFormat === "image" && !options?.previewOptions?.qrcodeOutputDest) {
    throw new Error("qrcodeFormat 属性的值为 image 时, qrcodeOutputDest 路径配置不能为空!");
  }

  if (errorKeys.length) throw new Error(`配置项 ${errorKeys.join(", ")} 不能为空!`);

  return { ...options, projectPath: resolve(options.projectPath), packageJsonPath: resolve(options.packageJsonPath) };
};

const parseEnv = async () => {
  const wxConfig = await loadEnv();
  return { ...validator(wxConfig) };
};

export { parseEnv };
