import { select, text } from "@clack/prompts";

const useCommand = async (packageVersion: string) => {
  const mode = (await select({
    message: "请选择操作",
    options: [
      { value: "preview", label: "预览" },
      { value: "upload", label: "上传" },
    ],
  })) as "preview" | "upload";

  const major = parseInt(packageVersion.split(".")[0]);
  const minor = parseInt(packageVersion.split(".")[1]);
  const patch = parseInt(packageVersion.split(".")[2]);
  const version = (await select({
    message: "请选择版本号",
    options: [
      { value: `${major}.${minor}.${patch}`, label: `${major}.${minor}.${patch}`, hint: "当前版本" },
      { value: `${major}.${minor}.${patch + 1}`, label: `${major}.${minor}.${patch + 1}`, hint: "补丁版本" },
      { value: `${major}.${minor + 1}.0`, label: `${major}.${minor + 1}.0`, hint: "小版本" },
      { value: `${major + 1}.0.0`, label: `${major + 1}.0.0`, hint: "大版本" },
    ],
  })) as string;

  const description = (await text({
    message: "请输入版本描述",
    // placeholder: "请输入版本描述",
    initialValue: version as string,
    validate(value) {
      if (value.length === 0) return `description is required!`;
    },
  })) as string;

  return { mode, version, desc: description };
};

export { useCommand };
