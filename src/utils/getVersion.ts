import { tryRequire } from "./index";

export const getVersion = async (packageJsonPath: string): Promise<string> => {
  try {
    const packageJson = await tryRequire(packageJsonPath);
    return packageJson.version;
  } catch (e) {
    throw new Error(`Failed to read package.json: ${e}`);
  }
};
