const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("./routes/export.route");
var bodyParser = require("body-parser");
let mongoose = require("mongoose");
const app = express();
let server = app.listen(5000, () => console.log("Server started on port 5000"));

mongoose.connect("mongodb://localhost:27017/angularAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.use("/users", router.userRouter);
