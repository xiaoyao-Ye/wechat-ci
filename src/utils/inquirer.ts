import inquirer from 'inquirer'

export const useInquirer = async () => {
  const rule = [{}]
  // 版本号
  //   获取当前版本号
  //   根据当前版本号进行patch, minor, major
  // 项目备注
  // 开发者
  // 当前是预览还是发布
  const {} = await inquirer.prompt(rule)
}
