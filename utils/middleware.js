const logger = require("./logger");
const fs = require("fs");
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization !== undefined) {
    if (authorization.toLowerCase().startsWith("bearer ")) {
      return authorization.substring(7);
    }
  }
  return null;
};
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};
const upLoadMiddleware = (req, res, next) => {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected." });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/svg+xml"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format." });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large." });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ message: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      message: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      message: "token expired",
    });
  }

  return response.status(500).json({ message: error.message });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  upLoadMiddleware,
};
