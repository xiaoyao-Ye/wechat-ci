#!/usr/bin/env node
import { getSettings } from "./utils/getSettings";
import { getVersion } from "./utils/getVersion";
import { Options, main } from "./utils/main";
import { parseEnv } from "./utils/parseEnv";
import { intro, outro, note } from "@clack/prompts";
import { useCommand } from "./utils/useCommand";
export { defineConfig } from "./utils/config";

const welcome = `
╭────────────────────────────────────────────╮
│                                            │
│  welcome to use wechat-ci!                 │
│                                            │
╰────────────────────────────────────────────╯`;

const init = async () => {
  intro(`wechat-ci`);
  note(welcome, "Hello");

  const { projectPath, packageJsonPath, privateKeyPath, type, appid, robot, previewOptions, settings } = await parseEnv();

  const setting = await getSettings(projectPath, settings);

  const packageVersion = await getVersion(packageJsonPath);

  const { mode, version, desc } = await useCommand(packageVersion);

  const options: Options = { projectPath, privateKeyPath, type, appid, robot, previewOptions, mode, version, desc, setting };

  await main(options);

  outro(`complete!`);
};

init();
