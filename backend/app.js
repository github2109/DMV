const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

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

//routes
readdirSync("./routes").map((r) => app.use("/api/", require("./routes/" + r)));


module.exports = app;
