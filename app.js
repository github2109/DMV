const express = require("express");
const path = require("path");
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
const uploadRouter = require("./routes/upload");
const fileUpload = require("express-fileupload");
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
app.use(
  fileUpload({
    useTempFiles: true,
  })
);



app.use(express.static(path.join(__dirname, "./build")));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

//Router
app.use("/api", userRouter);
app.use("/api/states", stateRouter);
app.use("/api/questions", questionRouter);
app.use("/api/modules", moduleRouter);
app.use("/api/messages", messageRouter);
app.use("/api/licenses", licenseRouter);
app.use("/api/exams", examRouter);
app.use("/api/uploads",uploadRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
