import { ProjectType } from 'miniprogram-ci/dist/@types/types'
import { tryRequire } from './index'

class Options {
  projectPath?: string
  type?: ProjectType
  appid?: string
  privateKeyPath?: string
  packageJsonPath?: string
  robot?: number
  previewOptions?: {
    qrcodeFormat?: 'image' | 'base64' | 'terminal' | undefined
    qrcodeOutputDest?: string
    pagePath?: string
    searchQuery?: string
    scene?: number
  }
  settings?: {}
}

const validator = (options: Options) => {
  let { projectPath, type, appid, privateKeyPath, packageJsonPath, previewOptions } = options

  if (!type) throw new Error('type 不能为空')

  if (!appid) throw new Error('appid 不能为空')

  if (!privateKeyPath) throw new Error('privateKeyPath 不能为空')

  if (!projectPath) throw new Error('projectPath 不能为空')

  if (!packageJsonPath) throw new Error('packageJsonPath 不能为空')

  if (previewOptions?.qrcodeFormat === 'image' && !previewOptions?.qrcodeOutputDest) {
    throw new Error('qrcodeFormat: image时qrcodeOutputDest路径不能为空')
  }

  return {
    ...options,
    projectPath,
    type,
    appid,
    privateKeyPath,
    packageJsonPath,
    previewOptions,
  }
}

const loadEnv = async () => {
  try {
    const res = await tryRequire('./wx.config.js')
    console.log('res', res)
    return res.default
  } catch (error) {
    console.log('加载 wx.config.js 失败', error)
    return { error: '未配置 wx.config.js 文件' }
  }
}

const parseEnv = async () => {
  const wxConfig = await loadEnv()
  if (wxConfig.error) throw new Error(wxConfig.error)
  return { ...validator(wxConfig) }
}

export { parseEnv }
