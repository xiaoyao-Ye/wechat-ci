import { Project, preview, upload } from "miniprogram-ci";
import { ProjectType } from "miniprogram-ci/dist/@types/types";
import { note, spinner } from "@clack/prompts";

export interface Options {
  projectPath: string;
  privateKeyPath: string;
  type: ProjectType;
  appid: string;
  robot?: number;
  previewOptions: any;
  mode: string;
  version: string;
  desc: string;
  setting: any;
}

export const main = async (options: Options) => {
  const { projectPath, privateKeyPath, type, appid, robot, previewOptions, mode, version, desc, setting } = options;

  const commonConfig = { version, setting };
  if (robot) Object.assign(commonConfig, { robot });

  const project = new Project({ type, appid, projectPath, privateKeyPath, ignores: ["node_modules/**/*"] });

  const spinnerInstance = spinner();
  spinnerInstance.start(`start ${mode}...`);
  if (mode === "preview") {
    const previewResult = await preview({ project, ...commonConfig, ...previewOptions });
    note(JSON.stringify(previewResult, null, 2), "previewResult");
  } else {
    const uploadResult = await upload({ project, ...commonConfig, desc });
    note(JSON.stringify(uploadResult, null, 2), "uploadResult");
  }
  spinnerInstance.stop();
};
