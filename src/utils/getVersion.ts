import { tryRequire } from './index'

export const getVersion = async (packageJsonPath: string): Promise<string | null> => {
  let version = null
  try {
    const packageJson = await tryRequire(packageJsonPath)
    version = packageJson.version
  } catch (e) {
    console.log('读取 package.json 失败', e)
  }
  return version
}
