const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const userRouter = require("./routes/user");
const stateRouter = require("./routes/state");
const questionRouter = require("./routes/question");
const moduleRouter = require("./routes/module");
const messageRouter = require("./routes/message");
const licenseRouter = require("./routes/license");
const examRouter = require("./routes/exam");

const app = express();

logger.info("connecting to", config.MONGODB_URL);
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

//Router
app.use("/api/user",userRouter);
app.use("/api/state",stateRouter);
app.use("/api/question",questionRouter);
app.use("/api/module",moduleRouter);
app.use("/api/message",messageRouter);
app.use("/api/license",licenseRouter);
app.use("/api/exam",examRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
