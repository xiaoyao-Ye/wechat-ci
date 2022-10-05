import { ProjectType } from 'miniprogram-ci/dist/@types/types'
import { tryRequire } from './index'

const validator = (options: UserConfig): UserConfig => {
  let { projectPath, type, appid, privateKeyPath, packageJsonPath, previewOptions } = options

  if (!type) throw new Error('type 不能为空')

  if (!appid) throw new Error('appid 不能为空')

  if (!privateKeyPath) throw new Error('privateKeyPath 不能为空')

  if (!projectPath) throw new Error('projectPath 不能为空')

  if (!packageJsonPath) throw new Error('packageJsonPath 不能为空')

  if (previewOptions?.qrcodeFormat === 'image' && !previewOptions?.qrcodeOutputDest) {
    throw new Error('qrcodeFormat: image时qrcodeOutputDest路径不能为空')
  }

  return options

  // return {
  //   ...options,
  //   projectPath,
  //   type,
  //   appid,
  //   privateKeyPath,
  //   packageJsonPath,
  //   previewOptions,
  // }
}

type UserConfigExport = UserConfig | UserConfigFn
type UserConfigFn = () => UserConfig | Promise<UserConfig>
interface UserConfig {
  /** 小程序 appid */
  appid: string
  /** 上传的项目路径 例: project/dist/build/mp-weixin */
  projectPath: string
  /** package.json 路径 例: project/package.json */
  packageJsonPath: string
  /** 私钥 key 路径 例: project/key/private.wxfcc8888888888888.key */
  privateKeyPath: string
  /** 小程序 miniProgram | miniProgramPlugin | 小游戏 miniGame | miniGamePlugin*/
  type: ProjectType
  /** 机器人id */
  robot?: number

  /** 预览配置 */
  previewOptions?: {
    /** 返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用 */
    qrcodeFormat?: 'image' | 'base64' | 'terminal' | undefined
    /** 二维码文件保存路径, required when qrcodeFormat is "image" 例: ./qrcode.jpg */
    qrcodeOutputDest?: string
    /** 预览页面路径 */
    pagePath?: string
    /** 预览页面路径启动参数 */
    searchQuery?: string
    /** 默认值 1011，具体含义见场景值列表 */
    scene?: string
  }

  /** 配置 > 自动获取project.config.json > 默认{ es6: true, es7: true, minify: true, ignoreUploadUnusedFiles: true } */
  settings?: {}
}

function defineConfig(config: UserConfigExport): UserConfigExport {
  return config
}

const loadEnv = async () => {
  try {
    const apiConfig: UserConfigExport = await tryRequire('./wx.config')
    if (typeof apiConfig === 'function') {
      return apiConfig()
    } else {
      return apiConfig
    }
  } catch (error) {
    console.error("try require error, please check 'wx.config.ts' file.")
    console.error(error)
    throw new Error('未配置 wx.config.ts 文件')
  }
}

const parseEnv = async () => {
  const wxConfig = await loadEnv()
  return { ...validator(wxConfig) }
}

export { parseEnv, defineConfig }
