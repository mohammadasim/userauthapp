const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./connection");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
mongoose.Promise = Promise;

app.get("/", (req, res) => {
    res.send("Hello world!");
});




const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);