import jiti from "jiti";
import path from "path";

const resolve = (PATH: string) => path.resolve(process.cwd(), PATH);

const tryRequire = async (id: string, rootDir: string = process.cwd()) => {
  // const _require = jiti(rootDir, { interopDefault: true });
  const _require = jiti(rootDir);
  return _require(id);
};

export { resolve, tryRequire };
