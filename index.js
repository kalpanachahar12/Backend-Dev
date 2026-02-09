const stringUtils = require("./stringUtils");

console.log(stringUtils.capitalize("hello world"));
console.log(stringUtils.reverseString("nodejs"));
console.log(stringUtils.countVowels("education"));

const express = require("express");
const app = express();

app.use(express.json());

let todos = [];
let id = 1;

app.post("/todos", (req, res) => {
    todos.push({ id: id++, task: req.body.task });
    res.send("Task added");
});

app.get("/todos", (req, res) => {
    res.send(todos);
});

app.put("/todos/:id", (req, res) => {
    const t = todos.find(x => x.id == req.params.id);
    if (t) t.task = req.body.task;
    res.send("Task updated");
});

app.delete("/todos/:id", (req, res) => {
    todos = todos.filter(x => x.id != req.params.id);
    res.send("Task deleted");
});

app.listen(3000, () => console.log("Server started"));