#!/usr/bin/env node
import path from 'path'
import { Project, preview } from 'miniprogram-ci'
import { ProjectType } from 'miniprogram-ci/dist/@types/types'

console.log('process.cwd()', process.cwd())
const resolve = (PATH: string) => path.join(process.cwd(), PATH)

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
  // ...commonConfig,
  // ...getLastOptions(previewOptions),
}

const main = async () => {
  const previewResult = await preview(lastPreviewOptions)
  console.log('previewResult', previewResult)
}

main()
