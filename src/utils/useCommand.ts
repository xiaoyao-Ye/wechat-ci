import { select, text } from "@clack/prompts";

const useCommand = async (packageVersion: string) => {
  const mode = (await select({
    message: "Please select the operation",
    options: [
      { value: "preview", label: "Preview" },
      { value: "upload", label: "Upload" },
    ],
  })) as "preview" | "upload";

  const major = parseInt(packageVersion.split(".")[0]);
  const minor = parseInt(packageVersion.split(".")[1]);
  const patch = parseInt(packageVersion.split(".")[2]);
  const version = (await select({
    message: "Please select the version",
    options: [
      { value: `${major}.${minor}.${patch}`, label: `${major}.${minor}.${patch}`, hint: "current version" },
      { value: `${major}.${minor}.${patch + 1}`, label: `${major}.${minor}.${patch + 1}`, hint: "patch version" },
      { value: `${major}.${minor + 1}.0`, label: `${major}.${minor + 1}.0`, hint: "minor version" },
      { value: `${major + 1}.0.0`, label: `${major + 1}.0.0`, hint: "major version" },
    ],
  })) as string;

  const description = (await text({
    message: "Please enter a version description",
    // placeholder: "Please enter a version description",
    initialValue: version as string,
    validate(value: string) {
      if (value.length === 0) return `description is required!`;
    },
  })) as string;

  return { mode, version, desc: description };
};

export { useCommand };
