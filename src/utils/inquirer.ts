import inquirer from 'inquirer'
interface Options {
  mode: 'preview' | 'upload'
  version: string
  desc: string
}
export const useInquirer = async (packageVersion: string | null): Promise<Options> => {
  const descRule = [{ name: 'description', message: '请输入版本描述:', validate: (desc: string) => desc.length > 0 }]
  const rule = [
    { name: 'mode', message: '预览还是上传:', type: 'list', default: 'preview', choices: ['preview', 'upload'] },
    { name: 'version', message: '请输入当前版本号:', validate: (version: string) => /^\d+\.\d+\.\d+$/.test(version) },
  ]
  if (packageVersion) rule[1].default = packageVersion

  let { mode, version } = await inquirer.prompt(rule)

  let desc = ''
  if (mode === 'upload') {
    const { description } = await inquirer.prompt(descRule)
    desc = description
  }

  return { mode, version, desc }
}
