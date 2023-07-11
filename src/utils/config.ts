import { ProjectType } from "miniprogram-ci/dist/@types/types";

export interface UserConfig {
  /** 小程序 appid */
  appid: string;
  /** 上传的项目路径 例: project/dist/build/mp-weixin */
  projectPath: string;
  /** package.json 路径 例: project/package.json */
  packageJsonPath: string;
  /** 私钥 key 路径 例: project/key/private.wxfcc8888888888888.key */
  privateKeyPath: string;
  /** 小程序 miniProgram | miniProgramPlugin | 小游戏 miniGame | miniGamePlugin*/
  type: ProjectType;
  /** 机器人id */
  robot?: number;

  /** 预览配置 */
  previewOptions?: {
    /** 返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用 */
    qrcodeFormat?: "image" | "base64" | "terminal" | undefined;
    /** 二维码文件保存路径, required when qrcodeFormat is "image" 例: ./qrcode.jpg */
    qrcodeOutputDest?: string;
    /** 预览页面路径 */
    pagePath?: string;
    /** 预览页面路径启动参数 */
    searchQuery?: string;
    /** 默认值 1011，具体含义见场景值列表 */
    scene?: string;
  };

  /** 编译配置 > 自动获取project.config.json > 默认{ es6: true, es7: true, minify: true, ignoreUploadUnusedFiles: true } */
  settings?: {};
}

type UserConfigFn = () => UserConfig | Promise<UserConfig>;

export type UserConfigExport = UserConfig | UserConfigFn;

export const defineConfig = (config: UserConfigExport): UserConfigExport => {
  return config;
};
