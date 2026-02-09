const fs = require("fs");
const path = require("path");

const src = "source";
const dest = "dest";

fs.readdir(src, (err, files) => {
    if (err) return console.log(err);

    files.forEach(file => {
        fs.copyFile(
            path.join(src, file),
            path.join(dest, file),
            err => {
                if (err) console.log(err);
            }
        );
    });
});