import { note } from "@clack/prompts";
import { tryRequire } from "./index";

export const getSettings = async (projectPath: string, settings: {} = {}) => {
  let setting = {};
  try {
    let projectConfig = await tryRequire(`${projectPath}/project.config.json`);
    setting = projectConfig.setting;
  } catch (error) {
    note("读取编译配置 project.config.json 失败, 请检查 projectPath 路径是否正确", "Warning");
    // console.log("读取编译配置 project.config.json 失败, 请检查 projectPath 路径是否正确");
  }
  const defaultOptions = {
    es6: true,
    es7: true,
    minify: true,
    autoPrefixWXSS: true,
    disableUseStrict: true,
    ignoreUploadUnusedFiles: true,
  };
  setting = Object.assign(setting, defaultOptions, settings);
  return setting;
};
