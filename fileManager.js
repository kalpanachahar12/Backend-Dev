const fs = require("fs");

// Write file
fs.writeFileSync("a.txt", "Hello Node");

// Read file
console.log(fs.readFileSync("a.txt", "utf8"));

// Copy file
fs.copyFileSync("a.txt", "b.txt");

// Delete file
fs.unlinkSync("b.txt");

// List directory
console.log(fs.readdirSync("."));