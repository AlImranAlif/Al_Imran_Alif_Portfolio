import { spawn } from "node:child_process";
// Accept normal Next flags and the Work preview's Vite-style flags.
const args = process.argv
  .slice(2)
  .flatMap((arg) =>
    arg === "--host" ? ["--hostname"] : arg === "--strictPort" ? [] : [arg],
  );
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", ...args],
  { stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
