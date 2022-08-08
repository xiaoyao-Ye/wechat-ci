#!/usr/bin/env node
import path from 'path'
import { Project, preview } from 'miniprogram-ci'
import { ProjectType } from 'miniprogram-ci/dist/@types/types'

console.log('process.cwd()', process.cwd())
const resolve = (PATH: string) => path.resolve(process.cwd(), PATH)

const projectPath = resolve('../wechat/dist/build/mp-weixin')

const options = {
  projectPath,
  type: 'miniProgram' as ProjectType,
  appid: 'wxfcc00bea75b14cab',
  privateKeyPath: resolve(`./key/private.wxfcc00bea75b14cab.key`),
  // ignores: [
  //   `${projectPath}/node_modules/**/*`,
  //   `${projectPath}/CHANGELOG.md`,
  //   `${projectPath}/README.md`,
  //   `${projectPath}/yarn.lock`,
  //   `${projectPath}/package-lock.json`,
  // ],
}
const project = new Project(options)

const lastPreviewOptions = {
  project,
  version: '0.0.1',
  desc: '',
  // 指定使用哪一个 ci 机器人，可选值：1 ~ 30
  robot: '',
  // #编译设置
  setting: '',
  // ...commonConfig,
  // ...getLastOptions(previewOptions),

  // 预览:
  // 返回二维码文件的格式 "image" 或 "base64"， 默认值 "terminal" 供调试用
  qrcodeFormat: '',
  // 二维码文件保存路径, required when qrcodeFormat is "image"
  qrcodeOutputDest: '',
  // 预览页面路径
  pagePath: '',
  // 预览页面路径启动参数
  searchQuery: '',
  // 默认值 1011，具体含义见场景值列表
  scene: '',
}

const main = async () => {
  const previewResult = await preview(lastPreviewOptions)
  console.log('previewResult', previewResult)
}

main()
