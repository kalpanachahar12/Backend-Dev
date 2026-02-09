const fs = require("fs");
let errorCount = 0;

const stream = fs.createReadStream("log.txt", "utf8");

stream.on("data", chunk => {
    if (chunk.includes("ERROR")) errorCount++;
});

stream.on("end", () => {
    console.log("Total Errors:", errorCount);
});