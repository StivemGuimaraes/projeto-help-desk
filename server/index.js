const express = require("express");
const app = express();
const port = 8001;

app.get("/", (req, res) => {
    res.send("hello world");
}) 

app.listen(port, () => {
    console.log("esta funcionando");
})