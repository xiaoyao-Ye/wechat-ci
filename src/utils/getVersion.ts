export const getVersion = async (packageJsonPath: string): Promise<string | null> => {
  let version = null
  try {
    const packageJson = await import(`${packageJsonPath}`)
    version = packageJson.default.version
  } catch (e) {
    console.log('读取 package.json 失败', e)
  }
  return version
}
