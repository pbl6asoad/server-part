const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("./routes/export.route");
const multer  = require("multer");
var bodyParser = require("body-parser");
let mongoose = require("mongoose");
const app = express();
let server = app.listen(5000, () => console.log("Server started on port 5000"));

app.use(multer({dest:"uploads"}).single("avatar"));

mongoose.connect("mongodb://localhost:27017/angularAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use("/", express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use("/post", router.postsRouter);

app.use("/users", router.userRouter);