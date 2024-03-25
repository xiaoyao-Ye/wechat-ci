import { note } from "@clack/prompts";
import { tryRequire } from "./index";

export const getSettings = async (projectPath: string, settings: {} = {}) => {
  let setting = {};
  try {
    let projectConfig = await tryRequire(`${projectPath}/project.config.json`);
    setting = projectConfig.setting;
  } catch (error) {
    note("Failed to read compiled configuration project.config.json, please check if projectPath path is correct.", "Warning");
    // console.log("Failed to read compiled configuration project.config.json, please check if projectPath path is correct.");
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
