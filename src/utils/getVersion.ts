import { tryRequire } from "./index";

export const getVersion = async (packageJsonPath: string): Promise<string> => {
  try {
    const packageJson = await tryRequire(packageJsonPath);
    return packageJson.version;
  } catch (e) {
    throw new Error(`读取 package.json 失败: ${e}`);
  }
};
