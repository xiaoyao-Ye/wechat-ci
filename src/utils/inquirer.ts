import inquirer from 'inquirer'
interface Options {
  mode: 'preview' | 'upload'
  version: string
  desc?: string
}
export const useInquirer = async (): Promise<Options> => {
  const descRule = [{ name: 'desc', message: '请输入版本描述:', validate: (desc: string) => desc.length > 0 }]
  const rule = [
    { name: 'mode', message: '预览还是上传:', type: 'list', default: 'preview', choices: ['preview', 'upload'] },
    {
      name: 'version',
      message: '请输入当前版本号:',
      default: '0.0.1',
      validate: (version: string) => {
        return /^\d+\.\d+\.\d+$/.test(version)
      },
    },
  ]

  const { mode, version } = await inquirer.prompt(rule)

  if (mode === 'upload') {
    const { desc } = await inquirer.prompt(descRule)
    return { mode, desc, version }
  }

  return { mode, version }
}
