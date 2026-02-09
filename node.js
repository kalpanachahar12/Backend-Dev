const fs = require("fs");
const data = fs.readFileSync("./input.txt","utf-8");
console.log(data);
const wordcount = data.split(" ").length;
console.log("word count", wordcount);
function writeWordCount(){
    fs.writeFileSync("output.txt",`word count: ${wordcount}`);

}
writeWordCount()


