#!/usr/bin/env node
const { verify, deactivateUser, listUsers } = require("./protected"); // import your internal functions

// Command-line arguments
const command = process.argv[2];   // e.g., "verify"
const target = process.argv[3];    // e.g., "bob"

if (!command) {
  console.error("Usage: node admin.js <command> [target]");
  console.error("Available commands: verify, deactivate, list");
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

  deactivate: async (username) => {
    if (!username) {
      console.error("Usage: node admin.js deactivate <username>");
      process.exit(1);
    }
    const success = await deactivateUser(username);
    console.log(success ? `User ${username} deactivated` : `Failed to deactivate ${username}`);
  },

  list: async () => {
    const users = await listUsers();
    console.log("Users:", users);
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