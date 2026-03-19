#!/usr/bin/env node
const { verify, require_verification } = require("./protected"); // import your internal functions

// Command-line arguments
const command = process.argv[2];  
const target = process.argv[3];   

if (!command) {
  console.error("Usage: node admin.js <command> [target]");
  console.error("Available commands: verify, require_verification");
  process.exit(1);
}

// Command dispatcher
const commands = {
  verify: async (username) => {
    if (!username) {
      console.error("Usage: node admin.js verify <username>");
      process.exit(1);
    }
    const success = await verify(username);
    console.log(success ? `User ${username} verified` : `Failed to verify ${username}`);
  },

  require_verification: (x) => {
    const i = Number(x);
    if (i !== 0 && i !== 1) {
      console.error("Usage: node admin.js require_verification <0 or 1>");
      process.exit(1);
    }
    const mode = require_verification(i);
    if (mode === false) "Command failed to execute";
    console.log(mode ? "now verification is REQUIRED" : "now verification is NOT required");
  },
};

// Run the selected command
(async () => {
  const fn = commands[command];
  if (!fn) {
    console.error(`Unknown command: ${command}`);
    console.error("Available commands:", Object.keys(commands).join(", "));
    process.exit(1);
  }
  await fn(target);
})();