export const getSettings = async (projectPath: string, settings: {} = {}) => {
  let setting = {}
  try {
    let projectConfig = await import(`${projectPath}/project.config.json`)
    setting = projectConfig.setting
  } catch (error) {
    console.log('读取 project.config.json 失败', error)
  }
  const defaultOptions = { es6: true, es7: true, minify: true, ignoreUploadUnusedFiles: true }
  setting = Object.assign(defaultOptions, setting, settings)
  return setting
}
