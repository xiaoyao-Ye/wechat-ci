import { UserConfigExport, UserConfig } from "./config";
import { resolve, tryRequire } from "./index";

const loadEnv = async () => {
  try {
    const apiConfig: UserConfigExport = (await tryRequire(resolve("./wx.config")))?.default;
    return typeof apiConfig === "function" ? apiConfig() : apiConfig;
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND") {
      throw new Error(
        `Please create and configure a wx.config.ts or wx.config.js file in the project root directory. Reference: https://github.com/xiaoyao-Ye/wechat-ci`,
      );
    }
    throw new Error(`Failed to read wx.config file: ${error}`);
  }
};

const validator = (options: UserConfig): UserConfig => {
  if (Object.keys(options).length === 0)
    throw new Error("No wx.config specific configuration items were read, please check if the configuration file is correct!");

  const requiredRule = ["projectPath", "type", "appid", "privateKeyPath", "packageJsonPath"];
  const errorKeys = requiredRule.filter(key => !options[key as keyof typeof options]);
  if (options?.previewOptions?.qrcodeFormat === "image" && !options?.previewOptions?.qrcodeOutputDest) {
    throw new Error(
      "When the value of the qrcodeFormat property is image, the qrcodeOutputDest path configuration cannot be empty!",
    );
  }

  if (errorKeys.length) throw new Error(`Configuration item ${errorKeys.join(", ")} cannot be null!`);

  return {
    ...options,
    projectPath: resolve(options.projectPath),
    packageJsonPath: resolve(options.packageJsonPath),
    privateKeyPath: resolve(options.privateKeyPath),
  };
};

const parseEnv = async () => {
  const wxConfig = await loadEnv();
  return { ...validator(wxConfig) };
};

export { parseEnv };
