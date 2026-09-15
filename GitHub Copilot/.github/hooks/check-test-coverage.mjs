import { execFileSync } from "node:child_process";

function getChangedFiles(commandArguments) {
  try {
    return execFileSync("git", commandArguments, { encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    return [];
  }
}

const changedFiles = new Set([
  ...getChangedFiles(["diff", "--name-only"]),
  ...getChangedFiles(["diff", "--cached", "--name-only"]),
  ...getChangedFiles(["ls-files", "--others", "--exclude-standard"])
]);

const hasLogicChange = [...changedFiles].some(
  (filePath) =>
    /\.[cm]?[jt]sx?$/.test(filePath) &&
    !/(^|\/)(node_modules|dist|build)(\/|$)/.test(filePath) &&
    !/\.(test|spec)\.[cm]?[jt]sx?$/.test(filePath)
);
const hasTestChange = [...changedFiles].some((filePath) =>
  /\.(test|spec)\.[cm]?[jt]sx?$/.test(filePath)
);

const output = hasLogicChange && !hasTestChange
  ? {
      continue: true,
      systemMessage:
        "Application JavaScript changed without test changes. Review the affected behavior and add or update tests when the behavior changed."
    }
  : { continue: true };

process.stdout.write(JSON.stringify(output));