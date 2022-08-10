import jiti from 'jiti'
import path from 'path'

export const resolve = (PATH: string) => path.resolve(process.cwd(), PATH)

export function tryRequire(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, { interopDefault: true })
  try {
    return _require(id)
  } catch (err: any) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error trying import ${id} from ${rootDir}`, err)
    }
    return {}
  }
}
