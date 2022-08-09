import path from 'path'

export const resolve = (PATH: string) => path.resolve(process.cwd(), PATH)
