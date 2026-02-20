const os = require("os");
const fs = require("fs");

// Function to log system information
function logSystemInfo() {
    const data =
        "Time: " + new Date().toLocaleString() + "\n" +
        "Platform: " + os.platform() + "\n" +
        "CPU Architecture: " + os.arch() + "\n" +
        "Total Memory: " + (os.totalmem() / 1024 / 1024).toFixed(2) + " MB\n" +
        "Free Memory: " + (os.freemem() / 1024 / 1024).toFixed(2) + " MB\n" +
        "----------------------------------\n";

    fs.appendFile("systemInfo.txt", data, (err) => {
        if (err) {
            console.log("Error writing to file");
        }
    });
}

// Log system info every 5 seconds
setInterval(logSystemInfo, 5000);