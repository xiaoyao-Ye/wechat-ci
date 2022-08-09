import { Project, preview, upload } from 'miniprogram-ci'
import { ProjectType } from 'miniprogram-ci/dist/@types/types'

interface options {
  projectPath: string
  privateKeyPath: string
  type: ProjectType
  appid: string
  robot?: number
  previewOptions: any
  mode: string
  version: string
  desc: string
  setting: any
}

export const main = async ({
  projectPath,
  privateKeyPath,
  type,
  appid,
  robot,
  previewOptions,
  mode,
  version,
  desc,
  setting,
}: options) => {
  const commonConfig = { version, setting, robot }
  if (!robot) delete commonConfig.robot

  const project = new Project({ type, appid, projectPath, privateKeyPath, ignores: ['node_modules/**/*'] })

  if (mode === 'preview') {
    const previewResult = await preview({ project, ...commonConfig, ...previewOptions })
    console.log('previewResult', previewResult)
  } else {
    const uploadResult = await upload({ project, ...commonConfig, desc })
    console.log('uploadResult', uploadResult)
  }
}
