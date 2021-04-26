const express = require("express");
const path = require("path");

const { indexRouter } = require("./routes/indexRouter");

global.APP_ROOT = path.resolve(__dirname);
const app = express();

app.use("/remotely", indexRouter);

module.exports = { app };
