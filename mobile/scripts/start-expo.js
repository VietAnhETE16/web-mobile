const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

function loadEnvLocal() {
  const file = path.join(__dirname, "../.env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    process.env[trimmed.slice(0, index)] ||= trimmed.slice(index + 1);
  }
}

function getLanIp() {
  const ips = [];
  for (const [name, entries] of Object.entries(os.networkInterfaces())) {
    for (const item of entries || []) {
      if (item.family === "IPv4" && !item.internal && item.address.startsWith("192.168.")) ips.push({ ip: item.address, name });
    }
  }
  ips.sort((a, b) => Number(!/wi-?fi|wireless/i.test(a.name)) - Number(!/wi-?fi|wireless/i.test(b.name)));
  return ips[0]?.ip || "127.0.0.1";
}

loadEnvLocal();
const host = process.env.REACT_NATIVE_PACKAGER_HOSTNAME || process.env.EXPO_PUBLIC_API_URL?.match(/^https?:\/\/([^/:]+)/)?.[1] || getLanIp();
process.env.REACT_NATIVE_PACKAGER_HOSTNAME = host;
process.env.EXPO_PUBLIC_API_URL ||= `http://${host}:3000/api`;

if (process.argv.includes("--print-host")) {
  console.log(host);
  process.exit(0);
}

console.log(`Expo LAN host: ${process.env.REACT_NATIVE_PACKAGER_HOSTNAME}`);
console.log(`API URL: ${process.env.EXPO_PUBLIC_API_URL}`);

const expoCli = path.join(__dirname, "../node_modules/expo/bin/cli");
const child = spawn(process.execPath, [expoCli, ...process.argv.slice(2)], { stdio: "inherit", env: process.env });
child.on("exit", code => process.exit(code ?? 0));
