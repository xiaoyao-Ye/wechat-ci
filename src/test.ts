#!/usr/bin/env node
import { getSettings } from './utils/getSettings'
import { getVersion } from './utils/getVersion'
import { main } from './utils/main'
import { parseEnv } from './utils/parseEnv'

const init = async () => {
  const { projectPath, packageJsonPath, privateKeyPath, type, appid, robot, previewOptions, settings } =
    await parseEnv()

  const setting = await getSettings(projectPath, settings)

  const packageVersion = await getVersion(packageJsonPath)

  const { mode, version, desc } = { mode: 'preview', version: packageVersion!, desc: 'test' }

  main({ projectPath, privateKeyPath, type, appid, robot, previewOptions, mode, version, desc, setting })
}

init()
