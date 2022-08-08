#!/usr/bin/env node
import path from 'path'
import { Project, preview } from 'miniprogram-ci'
import { ProjectType } from 'miniprogram-ci/dist/@types/types'
import { useInquirer } from './utils/inquirer'

// - [x] 获取命令行输入,
// - [ ] 获取config.js信息, 并且验证必填项是否已填
// - [ ] 如果wx.config.js有当前版本, 则使用version, 否则,去获取项目/dist/build/package.json版本
// - [ ] 如果有备注信息, 使用, 如果没有备注信息去获取最近的git提交记录 组装成 version + commit msg + author
// - [ ] main()
// - [ ] 获取当前小程序的配置project.config.json
// - [ ] 处理上传和预览公共配置
// - [ ] 上传/预览

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
  const { mode, version, desc } = await useInquirer()
  console.log('mode', mode)
  console.log('version', version)
  console.log('desc', desc)

  console.log('preview', preview)
  console.log('previewResult', lastPreviewOptions)
  // const previewResult = await preview(lastPreviewOptions)
  // console.log('previewResult', previewResult)
}

main()
