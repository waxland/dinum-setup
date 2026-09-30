import { execSync } from "child_process";
import os from "os";

const PORTS_TO_CHECK = [3000, 5173, 8071, 6379, 15432];

function isWindows() {
  return os.platform() === "win32";
}

function checkPort(port) {
  try {
    let command = "";
    if (isWindows()) {
      command = `netstat -ano | findstr :${port}`;
    } else {
      command = `lsof -i :${port} -sTCP:LISTEN`;
    }
    const output = execSync(command, { encoding: "utf-8", stdio: ["pipe", "pipe", "ignore"] });
    return output.trim() !== "";
  } catch (error) {
    // Command fails (exit code 1) if lsof/netstat finds no matches, which means port is free
    return false;
  }
}

let hasConflicts = false;

console.log("🔍 Checking local ports for conflicts...");

for (const port of PORTS_TO_CHECK) {
  const inUse = checkPort(port);
  if (inUse) {
    hasConflicts = true;
    console.error(`❌ Port ${port} is already in use.`);
    if (!isWindows()) {
      try {
        const lsofOutput = execSync(`lsof -i :${port} -sTCP:LISTEN`, { encoding: "utf-8" }).split(
          "\n",
        )[1]; // Get first process
        if (lsofOutput) {
          const parts = lsofOutput.split(/\s+/);
          console.error(`   -> Used by process: ${parts[0]} (PID: ${parts[1]})`);
        }
      } catch (e) {}
    }
  } else {
    console.log(`✅ Port ${port} is free.`);
  }
}

if (hasConflicts) {
  console.error(
    "\n⚠️ Port conflicts detected! Please stop the conflicting services before running make dev or make bootstrap.",
  );
  if (!isWindows()) {
    console.error(
      '   (Hint: You can use "kill -9 <PID>" to terminate the process blocking the port)',
    );
  }
  process.exit(1);
}

console.log("\n🚀 All required ports are available!");
process.exit(0);
